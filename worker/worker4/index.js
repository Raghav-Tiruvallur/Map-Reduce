const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER4_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER4_PORT,() => {
    console.log(`Worker 4 running at port ${WORKER4_PORT}`);
})