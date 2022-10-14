const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const masterRoutes=require('./master')
const {MASTER_PORT} = require('../utils/utils')
app.use("/master",masterRoutes)



app.listen(MASTER_PORT,() => {
    console.log(`Master running at port ${MASTER_PORT}`);
})