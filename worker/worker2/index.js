const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER2_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER2_PORT,() => {
    console.log(`Worker 2 running at port ${WORKER2_PORT}`);
})