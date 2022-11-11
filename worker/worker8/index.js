const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER8_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER8_PORT,() => {
    console.log(`Worker 8 running at port ${WORKER8_PORT}`);
})