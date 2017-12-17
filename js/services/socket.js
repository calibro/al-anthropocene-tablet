app.factory('socket',function(socketFactory){
    //Create socket and connect to http://chat.socket.io
    //var myIoSocket = io.connect('http://192.168.2.1:3000');
    //var myIoSocket = io.connect('http://disco-volante.local:3000');
    //var myIoSocket = io.connect('http://127.0.0.1:3000');
    var myIoSocket = io.connect('https://floating-wave-21737.herokuapp.com/')

    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
})
