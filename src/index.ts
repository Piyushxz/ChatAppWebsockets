import { WebSocketServer ,WebSocket} from "ws";


const ws = new WebSocketServer({port:8080})


const sockets:WebSocket[] = []

ws.on("connection",(socket)=>{

    sockets.push(socket)



    socket.on("message",(message)=>{
        for(let i = 0 ; i < sockets.length ; i++){
            sockets[i].send(message.toString())
        }
    })
})