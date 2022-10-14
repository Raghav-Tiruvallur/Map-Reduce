const router = require('express').Router();

router.get("/are-you-free",(req,res)=>{
    res.status(200).json({"data":"free"})
})

router.post("/mapping",(req,res)=>{
    const files=req.body.data
    
    res.status(200).json({"data":"received"})
})



module.exports=router