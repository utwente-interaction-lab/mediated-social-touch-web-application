const express = require('express')
const app = express()

const
    {Server} = require("socket.io")
server = new Server(3000, {
    cors: {
        origin: "*"
    }
});

// let sequenceNumberByClient = new Map();
let output = null;
// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    //sequenceNumberByClient.set(socket, 1);

    socket.on("touchpoints", (arg) => {
        console.log(arg); // world
        if (output != null) output.emit("touchpoints", arg);
    });

    socket.on("device", (arg) => {
        if (arg == "output") output = socket;
    })

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        if (socket == output) output = null;
        //   sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

