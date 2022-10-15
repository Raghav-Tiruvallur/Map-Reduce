const mapper = require('../utils/map');

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
        files.forEach((file)=>{
            const pathFile=path + file 
            //mapper(pathFile)
        })
        res.status(200).json({"data":"mapping done"})
    }
    catch(e){
        res.status(500).json({"data":e})
    }
})



module.exports=router