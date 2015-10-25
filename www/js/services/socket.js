app.factory('socket',function(socketFactory){
    //Create socket and connect to http://chat.socket.io
    //var myIoSocket = io.connect('http://127.0.0.1:3000');
    //var myIoSocket = io.connect('gessicas-iMac.local:3000');
    var myIoSocket = io.connect('http://192.168.1.136:3000');

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})
