const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER10_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER10_PORT,() => {
    console.log(`Worker 10 running at port ${WORKER10_PORT}`);
})