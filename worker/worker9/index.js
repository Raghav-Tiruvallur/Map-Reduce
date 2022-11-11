const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const workerRoutes=require('../worker')
const {WORKER9_PORT} = require('../../utils/utils')
app.use("/worker",workerRoutes)



app.listen(WORKER9_PORT,() => {
    console.log(`Worker 9 running at port ${WORKER9_PORT}`);
})