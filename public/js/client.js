var socket = io.connect();

socket.on('connect', function() {
    console.log(socket.id)
});


socket.on("hello",(message)=>{
    console.log(message)
})

