const router = require('express').Router();
const axios=require('axios')
const {WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT}=require('../utils/utils')
const fs = require('fs')
const files=fs.readdirSync('../files')
const numberOfFiles = files.length
var workerToFiles={}
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

router.get("/get-data",async(req,res)=>{
    const ports=[WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT]
    
    const freePorts=await sendRequests(ports)
    assignFilesToWorkers(freePorts)
    const mappingWorkerPorts=Object.keys(workerToFiles)
    const data=await Promise.all(mappingWorkerPorts.map(async(port)=>{
        const requestURL=`http://localhost:${port}/worker/mapping`
        const JSONObject={"data":workerToFiles[port]}
        const {data} = await axios.post(requestURL,JSONObject)
        if(data && data.data === "mapping done")
        {
            return data.data
        }
        
    })
    )
    //master has got news that the mapping is done in all the mapping workers and written to local files
    //from there send to reducer 
    //reducer will write to files locally
    //yeah then basic shit is done
    
})

module.exports=router