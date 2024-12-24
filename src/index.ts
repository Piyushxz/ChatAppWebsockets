import { WebSocketServer } from "ws";


const ws = new WebSocketServer({port:8080})


ws.on("connection",(socket)=>{

    socket.send("Hey")
})