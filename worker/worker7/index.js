const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER7_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER7_PORT,() => {
    console.log(`Worker 7 running at port ${WORKER7_PORT}`);
})