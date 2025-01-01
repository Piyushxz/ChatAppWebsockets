import { WebSocketServer ,WebSocket} from "ws";

interface User{
    socket:WebSocket,
    room:string,
    user:string,
    sentBy?:string
}

const ws = new WebSocketServer({port:8080})



const sockets:User[] = []

ws.on("connection",(socket)=>{

    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message)

        if(parsedMessage.type === "join"){
            console.log(`User joined ${parsedMessage.payload.roomId}`)
            
            sockets.push({
                socket,
                room:parsedMessage.payload.roomId,
                user:parsedMessage.payload.username
            })
        }


        if(parsedMessage.type == "chat"){
            const currentUserRoom = sockets.find((x)=>x.socket == socket)?.room

            for(let i = 0 ; i < sockets.length;i++){
                if(sockets[i].room === currentUserRoom){
                    sockets[i].socket.send(JSON.stringify({message:parsedMessage.payload.message,sentBy:parsedMessage.payload.sentBy}))
                }
            }
        }
    })

    
})