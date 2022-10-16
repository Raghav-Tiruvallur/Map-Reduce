const express = require('express');
const cors = require('cors')
const app = express();
const cron = require('node-cron');
app.use(cors());
app.use(express.json());
const masterRoutes=require('./master')
const {MASTER_PORT} = require('../utils/utils');
const sendHeartbeat = require('./heartbeat');
app.use("/master",masterRoutes)


cron.schedule('* * * * *', () => {
    console.log("sending heartbeat to all workers");
    sendHeartbeat()
});
app.listen(MASTER_PORT,() => {
    console.log(`Master running at port ${MASTER_PORT}`);
})