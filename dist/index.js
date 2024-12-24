"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
const sockets = [];
ws.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("message", (message) => {
        for (let i = 0; i < sockets.length; i++) {
            sockets[i].send(message.toString());
        }
    });
});
