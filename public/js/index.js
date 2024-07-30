/*
Author: Lucian Irsigler
Date: 2024/07/30

This file is responsible for the index.html page. It will handle the creation of lobbies and joining of lobbies.
It will also display the players in the lobby and the room code.
The game will start when the host clicks on the "Start Game" button.
*/

let roomCodeInput = document.getElementById("roomCode");
let createLobbyButton = document.getElementById("createLobby");
let joinLobbyButton = document.getElementById("joinlobby");
let gameHeader = document.getElementById("gameHeader");
let startGameButton;
let roomCodeText;
let lobbyHeader;
let ul;

function startGame(){
    roomCodeInput.remove();
    createLobbyButton.remove();
    joinLobbyButton.remove();
    roomCodeText.remove();
    lobbyHeader.remove();
    gameHeader.remove();
    ul.remove();
    if (host){
        startGameButton.remove();
    }

    let canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

    let script = document.createElement("script");
    script.src = "js/render.js";
    script.defer = true;
    document.body.appendChild(script);

}

function hideIndexElements(){
    roomCodeInput.style.display = "none";
    createLobbyButton.style.display = "none";
    joinLobbyButton.style.display = "none";
}

// Create lobby information
function addLobbyInformation(){
    const header = document.createElement("h1");
    header.textContent = "Lobby";
    header.id = "lobbyHeader";
    document.body.appendChild(header);
    lobbyHeader = document.getElementById("lobbyHeader");


    const header1 = document.createElement("h2");
    header1.textContent = "Code:";
    header1.id ="currRoomCode";
    document.body.appendChild(header1);
    roomCodeText = document.getElementById("currRoomCode");


    // Create unordered list
    ul = document.createElement("ul");
    ul.id="playerList";
    document.body.appendChild(ul);
    ul = document.getElementById("playerList");
}

function createStartGameButton(){
    let temp = document.createElement("button");
    temp.textContent = "Start Game";
    temp.id = "startGame";
    document.body.appendChild(temp);

    startGameButton = document.getElementById("startGame");

    startGameButton.addEventListener("click",()=>{
        socket.emit("startGame",roomID);
    })
}


// Update the list of players in the lobby
function updateList(newInfo){
    //if ul is undefined at this point, then user didnt click on "create lobby" function, thus must be a joiner
    if (ul==undefined){
        host = false;
        hideIndexElements()
        addLobbyInformation();
    }

    //remove all li
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    // add players
    for (let i = 0; i < newInfo.players.length; i++){
        let player = newInfo.players[i];
        let li = document.createElement("li");
        li.textContent = player;
        ul.appendChild(li);
    }

    roomCodeText.textContent = `Code:${newInfo.roomCode}`;
}

createLobbyButton.addEventListener("click", ()=>{
    host = true;
    socket.emit("createLobby");

    hideIndexElements();
    addLobbyInformation();
    createStartGameButton();
})

// Join lobby
joinLobbyButton.addEventListener("click", ()=>{
    let roomCode = roomCodeInput.value;
    socket.emit("joinLobby",roomCode);
})


