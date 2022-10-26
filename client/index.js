const express = require('express');
const cors = require('cors')
const fileUpload=require('express-fileupload')
const app = express();
var bodyParser = require('body-parser');
const clientRoutes=require('./client')
const {CLIENT_PORT} = require('../utils/utils');
app.use(cors());
app.use(express.json());
app.use(fileUpload())
app.use(express.static("files"));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use("/client",clientRoutes)

app.listen(CLIENT_PORT,() => {
    console.log(`Client running at port ${CLIENT_PORT}`);
})