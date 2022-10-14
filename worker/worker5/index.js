const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER5_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER5_PORT,() => {
    console.log(`Worker 5 running at port ${WORKER5_PORT}`);
})