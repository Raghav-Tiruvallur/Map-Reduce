const router = require('express').Router();

router.get("/are-you-free",(req,res)=>{
    res.status(200).json({"data":"free"})
})

module.exports=router