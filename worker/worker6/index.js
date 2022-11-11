const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER6_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER6_PORT,() => {
    console.log(`Worker 6 running at port ${WORKER6_PORT}`);
})