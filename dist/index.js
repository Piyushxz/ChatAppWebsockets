"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
const sockets = [];
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log(`User joined ${parsedMessage.payload.roomId}`);
            sockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                user: parsedMessage.payload.username
            });
        }
        if (parsedMessage.type == "chat") {
            const currentUserRoom = (_a = sockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < sockets.length; i++) {
                if (sockets[i].room === currentUserRoom) {
                    sockets[i].socket.send(JSON.stringify({ message: parsedMessage.payload.message, sentBy: parsedMessage.payload.sentBy }));
                }
            }
        }
    });
});
