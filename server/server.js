module.exports = function(io) {
    io.on('connection', (socket) => {
        const sessionID = socket.id;
        console.log(`User ${sessionID} connected`);

        let message = `CONNECTED ${sessionID}`;

        io.emit('hello',message ); 

        socket.on('disconnect', () => {
            console.log(`User ${sessionID} disconnected`);
        });
      });

    
};