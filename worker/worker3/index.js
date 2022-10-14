const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER3_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER3_PORT,() => {
    console.log(`Worker 3 running at port ${WORKER3_PORT}`);
})