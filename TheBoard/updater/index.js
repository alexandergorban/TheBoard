// updater/index.js

(function (updater) {
    
    var socketio = require("socket.io");
    
    updater.init = function (server) {
        var io = socketio.listen(server);
        
        io.sockets.on("connection",
            function (socket) {
            console.log("socket was connected");
            socket.on("newNote",
                    function (data) {
                socket.broadcast.emit("broadcast note", data.note);
            });
        });
    };

})(module.exports);