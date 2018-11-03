import express = require("express");
import bodyParser = require('body-parser')
import socket = require('socket.io');
import { createServer } from 'http';
import * as requestController from "./controller/request_controller";

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
app.post("/", (req, res) => {
    io.sockets.emit("update", req.body);
})


io.on("connection", function(socket) {
    console.log("Connected to Socket client.")
});
export default httpServer;
// module.exports = app;
