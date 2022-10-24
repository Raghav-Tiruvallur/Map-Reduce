const combiner = require('../utils/combiner');
const mapper = require('../utils/map');
const reducer = require('../utils/reduce');

const router = require('express').Router();

router.get("/are-you-free",(req,res)=>{
    res.status(200).json({"data":"free"})
})

router.post("/mapping",(req,res)=>{
    try{
        const files=req.body.data
        const directorySplit=__dirname.split("/")
        directorySplit[directorySplit.length - 1]="files"
        let path=""
        directorySplit.forEach((dirPath)=>{
            path+=dirPath + "/"
        })
        let filePaths=[]
        files.forEach((file)=>{
            const pathFile=path + file 
            const filePath=mapper(pathFile)
            filePaths.push(filePath)
        })
        res.status(200).json({"data":filePaths})
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
    const files=req.body.data
    let fileNames=[]
    files.forEach((file)=>{
        const fileName=combiner(file)
        fileNames=[...new Set([...fileName ,...fileNames])] 
    })
    console.log(fileNames.length)
    res.status(200).json({"data":fileNames})
})




const delay = ms => new Promise(res => setTimeout(res, ms));
router.post("/reducer",async(req,res)=>{
    const files=req.body.data
    files.forEach((file)=>{
        reducer(file)
    })
    res.status(200).json({"data":"reducing done"})
    
})



module.exports=router