const router = require('express').Router();
const axios=require('axios')
const {WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT}=require('../utils/utils')
const fs = require('fs')
const files=fs.readdirSync('../files')
const numberOfFiles = files.length
var workerToFiles={}
var reducerWorkerToFilesSorting={}
var reducerWorkerToFiles={}
const ports=[WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT]
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
    console.log(numberOfFilesPerReducerWorker)
    let i=0;
    reducerWorkers.forEach((reducerWorker)=>{
        const filesForWorker=files.slice(i,i + numberOfFilesPerReducerWorker)
        reducerWorkerToFileMapping[reducerWorker]=filesForWorker
        i+=numberOfFilesPerReducerWorker
    })
}



router.get("/get-data",async(req,res)=>{
   
    
    const freePorts=await sendRequests(ports)
    assignFilesToWorkers(freePorts)
    const mappingWorkerPorts=Object.keys(workerToFiles)
    const filePathsFromMapperUnFlattened=await Promise.all(mappingWorkerPorts.map(async(port)=>{
        const requestURL=`http://localhost:${port}/worker/mapping`
        const JSONObject={"data":workerToFiles[port]}
        const {data} = await axios.post(requestURL,JSONObject)
        return data.data
        
    })
    )
    const filePathsFromMapper=filePathsFromMapperUnFlattened.flat(1)
    const otherWorkers=ports.filter((port)=> !mappingWorkerPorts.includes(port))
    assignReducerWorkersToFiles(otherWorkers,filePathsFromMapper,reducerWorkerToFilesSorting)
    let filePathsSortedFilesUnFlattened=await Promise.all(otherWorkers.map(async(workerPort)=>{
        const filesToBeSentToReducerSorting={"data":reducerWorkerToFilesSorting[workerPort]}
        return axios.post(`http://localhost:${workerPort}/worker/sorter`,filesToBeSentToReducerSorting)
    }))
    filePathsSortedFilesUnFlattened=filePathsSortedFilesUnFlattened.map(({data})=>data.data)
    const filePathsSortedFilesWithDuplicates=filePathsSortedFilesUnFlattened.flat(1)
    const filePathsSortedFiles=[... new Set(filePathsSortedFilesWithDuplicates)]
    assignReducerWorkersToFiles(otherWorkers,filePathsSortedFiles,reducerWorkerToFiles)
    await Promise.all(otherWorkers.map(async(worker)=>{
        const filesToBeSentToReducer={"data":reducerWorkerToFiles[worker]}
        const {data}=await axios.post(`http://localhost:${worker}/worker/reducer`,filesToBeSentToReducer)
        return data.data
    }))
    res.status(200).json({"data":"it's done"})
    
})

module.exports=router