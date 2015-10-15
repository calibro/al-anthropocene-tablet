app.factory('socket',function(socketFactory){
    //Create socket and connect to http://chat.socket.io
    var myIoSocket = io.connect('http://127.0.0.1:3000');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})
