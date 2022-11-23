const router = require('express').Router();
const axios=require('axios')
const {WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT, WORKER6_PORT, WORKER7_PORT, WORKER8_PORT, WORKER9_PORT, WORKER10_PORT}=require('../utils/utils')
const fs = require('fs')
const files=fs.readdirSync('../files')
const numberOfFiles = files.length
var workerToFiles={}
var reducerWorkerToFilesSorting={}
var reducerWorkerToFiles={}
let taskID=1;
const ports=[WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT,WORKER6_PORT,WORKER7_PORT,WORKER8_PORT,WORKER9_PORT,WORKER10_PORT]

class TaskQueue
{
    constructor()
    {
        this.items = [];
    }
    enqueue(element)
    {    
        this.items.push(element);
    }   
    dequeue()
    {
        if(this.isEmpty())
            return -1;
        return this.items.shift();
    }              
    front()
    {
        if(this.isEmpty())
            return -1;
        return this.items[0];
    }
    isEmpty()
    {
        return this.items.length === 0;
    }
}

var taskQueue=new TaskQueue();
//{
// taskID, taskType,data,assignedTo 
//}


const assignFilesToWorkers=(ports)=>{
    let numberOfWorkers;
    if(ports.length < 3)
        numberOfWorkers=ports.length
    else 
        numberOfWorkers = 3
    const numberOfFilesPerWorker = numberOfFiles / numberOfWorkers
    const shuffled = ports.sort(() => 0.5 - Math.random());
    const mappingWorkers=shuffled.slice(0,numberOfWorkers)
    let i=0
    mappingWorkers.forEach((worker)=>{
        const currentFiles=files.slice(i,i + numberOfFilesPerWorker)
        workerToFiles[worker]=currentFiles
        i+=numberOfFilesPerWorker
    })
}

const getMappingPorts=(freePorts)=>{
    let numberOfWorkers;
    if(ports.length < 5)
        numberOfWorkers=ports.length
    else 
        numberOfWorkers = 5
    const shuffled = ports.sort(() => 0.5 - Math.random());
    const mappingWorkers=shuffled.slice(0,numberOfWorkers)
    return mappingWorkers
}



const sendRequests=async(ports)=>{
    
    const data=await Promise.all(ports.map(async (port)=>{
        const requestURL=`http://localhost:${port}/worker/are-you-free`
        const {data} = await axios.get(requestURL)
        if(data.data === "free")
            return port
    }
    ))
    return data
    
}

const assignReducerWorkersToFiles=(reducerWorkers,files,reducerWorkerToFileMapping)=>{
    const numberOfReducerWorkers=reducerWorkers.length
    const numberOfFiles=files.length
    const numberOfFilesPerReducerWorker=Math.ceil(numberOfFiles / numberOfReducerWorkers)
    let i=0;
    reducerWorkers.forEach((reducerWorker)=>{
        const filesForWorker=files.slice(i,i + numberOfFilesPerReducerWorker)
        reducerWorkerToFileMapping[reducerWorker]=filesForWorker
        i+=numberOfFilesPerReducerWorker
    })
}


router.get("/get-workers",(req,res)=>{
    res.status(200).json({"data":ports})
})

router.get("/logs",async(req,res)=>{
    let logData=[]
    ports.map((port)=>{
        logData.push(axios.get(`http://localhost:${port}/worker/get-logs`))
    })
    let logs=await Promise.all(logData)
    logs=logs.map(({data})=>data.data)
    res.status(200).json({"data":logs})
})

router.get("/get-data",async(req,res)=>{
   
    
    const freePorts=await sendRequests(ports)
    const mappingWorkerPorts=getMappingPorts(freePorts)
    console.log(mappingWorkerPorts)
    let filePathsFromMapperUnFlattened =[];
    let filePathsSortedFilesUnFlattened=[];
    files.forEach((file)=>{
        const data={
            taskID,
            file,
            taskType:"MAP",
            assignedTo:""
        }
        taskQueue.enqueue(data)
        taskID++;
    })
    let time=new Date()
    while(!taskQueue.isEmpty())
    {
        let mappingTasks=[]
        mappingWorkerPorts.forEach((worker)=>{
            if(!taskQueue.isEmpty())
            {
                let task=taskQueue.front();
                taskQueue.dequeue()
                task.assignedTo=worker
                const requestURL=`http://localhost:${worker}/worker/mapping`
                const JSONObject={"data":task}
                mappingTasks.push(axios.post(requestURL,JSONObject))
            }
                
            
        })
        const x=await Promise.all(mappingTasks)
        filePathsFromMapperUnFlattened.push(...x)


     }
     time=new Date() - time 
     time/=1000
     console.log("Mapping takes: ",time)
    const filePathsFromMapper=filePathsFromMapperUnFlattened.map(({data})=>data.data)
    let filePathsFromMapperFlattened=[]
    filePathsFromMapper.forEach((file)=>{
        //filePathsFromMapperFlattened=[...new Set([...filePathsFromMapperFlattened,file])]
        filePathsFromMapperFlattened=[...filePathsFromMapperFlattened,...file]
    })
    filePathsFromMapperFlattened=[...new Set(filePathsFromMapperFlattened)]
    const otherWorkers=ports.filter(port=>!mappingWorkerPorts.includes(port))
    // filePathsFromMapper.forEach((file)=>{
    //     const data={
    //         taskID,
    //         file,
    //         taskType:"SORTING",
    //         assignedTo:""
    //     }
    //     taskQueue.enqueue(data)
    //     taskID++;
    // })
    // console.log(otherWorkers)
    // while(!taskQueue.isEmpty())
    // {
    //     let sortingTasks=[]
    //     otherWorkers.forEach((worker)=>{
    //         if(!taskQueue.isEmpty())
    //         {
    //             let task=taskQueue.front();
    //             taskQueue.dequeue()
    //             task.assignedTo=worker
    //             const requestURL=`http://localhost:${worker}/worker/sorter`
    //             const JSONObject={"data":task}
    //             sortingTasks.push(axios.post(requestURL,JSONObject))
    //         }
                
            
    //     })
    //     const x=await Promise.all(sortingTasks)
    //     filePathsSortedFilesUnFlattened.push(...x)


    // }
    

    // const filePathsSortedFilesWithDuplicates=filePathsSortedFilesUnFlattened.map(({data}) => data.data).flat(1)
    // const filePathsSortedFiles=[... new Set(filePathsSortedFilesWithDuplicates)]
    filePathsFromMapperFlattened.forEach((file)=>{
        const data={
            taskID,
            file,
            taskType:"REDUCE",
            assignedTo:""
        }
        taskQueue.enqueue(data)
        taskID++;
    })
    while(!taskQueue.isEmpty())
    {
        let reduceTasks=[]
        otherWorkers.forEach((worker)=>{
            if(!taskQueue.isEmpty())
            {
                let task=taskQueue.front();
                taskQueue.dequeue()
                task.assignedTo=worker
                const requestURL=`http://localhost:${worker}/worker/reducer`
                const JSONObject={"data":task}
                reduceTasks.push(axios.post(requestURL,JSONObject))
            }
                
            
        })
        await Promise.all(reduceTasks) 
    }

    // let logs=[]
    // freePorts.map((port)=>{
    //     logs.push(axios.get(`http://localhost:${port}/worker/get-logs`))
    // })
    // const logData=await Promise.all(logs)
    // let totalLogs=[]
    // logData.map(({data})=>totalLogs.push(...Object.values(data)))
    // totalLogs=totalLogs.map((log)=>Object.values(log)[0])
    res.status(200).json({"data":"it's done"})
    
})

module.exports=router