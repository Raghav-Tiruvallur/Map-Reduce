const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER1_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER1_PORT,() => {
    console.log(`Worker 1 running at port ${WORKER1_PORT}`);
})

