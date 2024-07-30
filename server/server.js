const misc = require('./misc');
const level = require('./levels');

let rooms = [];

module.exports = function(io) {
    io.on('connection', (socket) => {
        const sessionID = socket.id;
        console.log(`User ${sessionID} connected`);

        socket.on('disconnect', () => {
            const roomsWithPlayer = rooms.filter(room => room.room.players.includes(sessionID));
            console.log(`User ${sessionID} disconnected`);
        });

        socket.on("createLobby", () => {
            let room = {
                roomCode:misc.makeid(4),
                players:[],
                gameStarted:false
            }

            room.players.push(sessionID);
            rooms.push({id:room.roomCode, room:room});
            socket.join(room.roomCode);
            socket.emit("getRoomCode", room);
            io.in(room.roomCode).emit("roomInfo",room);
        });

        socket.on("joinLobby",(roomCode)=>{
            let index = rooms.findIndex((room)=>room.id === roomCode)
            let foundRoom = rooms[index];

            if (!foundRoom){
                let message = "Room not found";
                socket.emit("getRoomError", message);
                return;
            }

            if (foundRoom.room.players.length >= 4){
                let message = "Room is full";
                socket.emit("getRoomError", message);
                return;
            }

            foundRoom.room.players.push(sessionID);
            rooms[index]=foundRoom;

            let playerID = `${sessionID}`;
            socket.join(foundRoom.id);
            io.in(foundRoom.id).emit("playerJoined",playerID)
            io.in(foundRoom.id).emit("roomInfo",foundRoom.room);
        })

        socket.on("startGame",(roomID)=>{
            let index = rooms.findIndex((room)=>room.id === roomID)
            let foundRoom = rooms[index];

            if (!foundRoom){
                let message = "Room not found";
                socket.emit("getRoomError", message);
                return;
            }

            foundRoom.room.gameStarted = true;
            rooms[index]=foundRoom;

            const roomToSend = foundRoom.room;
            const levelToSend = level.getLevel("level2");
            io.in(foundRoom.id).emit("startGame",{level:levelToSend,room:foundRoom.room});

            for (let i = 0; i < roomToSend.players.length; i++){
                let playerInfo = {
                    myCharacterNum:i
                }
                //send to specific socket
                io.to(roomToSend.players[i]).emit("recievePlayerInfo",playerInfo);
            }
        })
      });

};