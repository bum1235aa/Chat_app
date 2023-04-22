const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:3000','http://localhost:3000/login'],
        methods: ['GET','POST'],
    }
});

io.on('connection', (socket) => {
    io.emit('noty', socket.id+' has logged in');
    socket.on('chat message', (data) => {
    if(data.user==="")data.user="Guest";
    io.emit('chat message', (data));
    console.log(data.msg);
    });
    socket.on('disconnect', () =>{
    io.emit('noty', socket.id+' disconnected');
    })
});

server.listen(3001,()=>{
    console.log("Starting");
})