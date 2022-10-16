const axios=require('axios')
const {WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT}=require('../utils/utils')
const ports=[WORKER1_PORT,WORKER2_PORT,WORKER3_PORT,WORKER4_PORT,WORKER5_PORT]
const sendHeartbeat=async()=>{
    await Promise.all(ports.map((port)=>{
        axios.get(`http://localhost:${port}/worker/heartbeat`)
    }))
}

module.exports=sendHeartbeat