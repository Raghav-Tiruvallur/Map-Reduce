const combiner = require('../utils/combiner');
const mapper = require('../utils/map');
const reducer = require('../utils/reduce');

const router = require('express').Router();

router.get("/are-you-free",(req,res)=>{
    res.status(200).json({"data":"free"})
})

var workerLogs={}

router.post("/mapping",(req,res)=>{
    try{
        const fileData=req.body.data
        const file=fileData.file
        //console.log(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        if(workerLogs[fileData.assignedTo])
        {
            workerLogs[fileData.assignedTo].push(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        }
        else 
        {
            workerLogs[fileData.assignedTo]=[`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`]
        }
       // console.log(workerLogs)
        const directorySplit=__dirname.split("/")
        directorySplit[directorySplit.length - 1]="files"
        let path=""
        directorySplit.forEach((dirPath)=>{
            path+=dirPath + "/"
        })
        const pathFile=path + file 
        const filePath=mapper(pathFile)
        let fileNames=[]
        const fileName=combiner(filePath)
        fileNames=[...new Set([...fileName ,...fileNames])] 
        res.status(200).json({"data":fileNames})
        //res.status(200).json({"data":filePath})
    }
    catch(e){
        res.status(500).json({"data":e})
    }
})

router.get("/heartbeat",(req,res)=>{
    console.log("hello")
    res.status(200).send({"data":"i am alive"})
})

router.post("/sorter",(req,res)=>{

    try{
        const fileData=req.body.data
        const file=fileData.file
        //console.log(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        if(workerLogs[fileData.assignedTo])
        {
            workerLogs[fileData.assignedTo].push(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        }
        else 
        {
            workerLogs[fileData.assignedTo]=[`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`]
        }
        let fileNames=[]
        const fileName=combiner(file)
        fileNames=[...new Set([...fileName ,...fileNames])] 
        res.status(200).json({"data":fileNames})
    }
    catch(e)
    {
        res.status(500).json({"data":e})
    }
})


router.get("/get-logs",(req,res)=>{
    res.status(200).json({"data":Object.values(workerLogs)[0]})
})



const delay = ms => new Promise(res => setTimeout(res, ms));
router.post("/reducer",async(req,res)=>{
    try{
        const fileData=req.body.data
        const file=fileData.file
        if(workerLogs[fileData.assignedTo])
        {
            workerLogs[fileData.assignedTo].push(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        }
        else 
        {
            workerLogs[fileData.assignedTo]=[`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`]
        }
        reducer(file)
        res.status(200).json({"data":"reducing done"})
    }
    catch(e)
    {
        res.status(500).json({"data":e})
    }
})



module.exports=router