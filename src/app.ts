import express = require("express");
import bodyParser = require('body-parser')
import socket = require('socket.io');
import { createServer } from 'http';
import * as requestController from "./controller/request_controller";

//app setup
const app = express();
var httpServer = createServer(app);
//Socket setup
var io = socket(httpServer);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post("/", requestController.postRequest);
app.get('/:key', requestController.getRequest);
//update client
app.post("/", (req, res) => {
    io.sockets.emit("update", req.body);
})

//connect to client 
io.on("connection", function(socket) {
    console.log("Connected to Socket client.")
});

export default httpServer;