const combiner = require('../utils/combiner');
const mapper = require('../utils/map');
const reducer = require('../utils/reduce');

const router = require('express').Router();

router.get("/are-you-free",(req,res)=>{
    res.status(200).json({"data":"free"})
})

router.post("/mapping",(req,res)=>{
    try{
        const fileData=req.body.data
        const file=fileData.file
        console.log(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        const directorySplit=__dirname.split("/")
        directorySplit[directorySplit.length - 1]="files"
        let path=""
        directorySplit.forEach((dirPath)=>{
            path+=dirPath + "/"
        })
        const pathFile=path + file 
        const filePath=mapper(pathFile)
        res.status(200).json({"data":filePath})
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
        console.log(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
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



const delay = ms => new Promise(res => setTimeout(res, ms));
router.post("/reducer",async(req,res)=>{
    try{
        const fileData=req.body.data
        const file=fileData.file
        console.log(`Working on taskID:${fileData.taskID} of task type:${fileData.taskType} and operating on file:${file}`)
        reducer(file)
        res.status(200).json({"data":"reducing done"})
    }
    catch(e)
    {
        res.status(500).json({"data":e})
    }
})



module.exports=router