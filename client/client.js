const router = require('express').Router();
const fs=require('fs');
const axios=require('axios')
const main = require('../main');
const {MASTER_PORT}=require('../utils/utils');
router.post("/upload-data",async(req,res)=>{
    try{
        const dataToBeWritten=req.files.file.data.toString()
        const fileName=req.files.file.name
        fs.writeFileSync(`../${fileName}`,dataToBeWritten)
        main(fileName)
        res.status(200).json({"data":"Upload successful"})
    }
    catch(e){
        res.status(500).json({"data":e})
    }
})
    

router.get("/get-frequency",async(req,res)=>{
    let time=new Date().getTime();
    const {data}=await axios.get(`http://localhost:${MASTER_PORT}/master/get-data`)
    time=new Date().getTime() - time;
    time/=1000
    time=time.toString()
    const reducedData=fs.readFileSync("../reduced/reduced.txt").toString().split("\n")
    if(reducedData[reducedData.length -1] == '')
    {
        reducedData.pop()
    }
    let tableData=[]
    reducedData.forEach((reduce,idx)=>{
        const dataPoint=reduce.split(",")
        const word=dataPoint[0]
        const frequency=dataPoint[1]
        const obj={idx,word,frequency}
        tableData.push(obj)
    })
    res.status(200).json({"data":tableData,"logs":data,"time":time})
})








module.exports=router