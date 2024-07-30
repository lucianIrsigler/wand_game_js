var socket = io.connect();

var roomID;
var playerID;
var currRoom;
var host;
var levelRecieved;
var myCharacterNum;

socket.emit('connection',()=>{
    playerID = socket.id;
});


socket.on("getRoomCode", (room) => {
    console.log(playerID);
    roomID = room.roomCode;
})

socket.on("getRoomError",(message)=>{console.log(message)})

socket.on("playerJoined",(playerID)=>{console.log(playerID)})

socket.on("roomInfo",(room)=>{
    currRoom = room;
    updateList(currRoom)
})

socket.on("startGame",(data)=>{
    console.log("Game started");
    levelRecieved = data["level"];
    currRoom = data["room"];
    startGame()
})


socket.on("recievePlayerInfo",(playerInfo)=>{
    myCharacterNum = playerInfo.myCharacterNum;
})
