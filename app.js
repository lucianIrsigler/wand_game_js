const express = require("express")
const {createServer} = require("node:http")

const app = express()

app.use(express.static("public"))

const server = createServer(app)

var io = require('socket.io')(server,{
    connectionStateRecovery: {}
});

app.get("/",(req,res)=>{
    res.sendFile("public/index.html")
})

app.get("/game",(req,res)=>{
    res.sendFile("game.html",{root:"public"})
})




require('./server/server.js')(io);


PORT = 3000
server.listen(PORT,()=>{
    console.log("server running at http://localhost:3000")
})
