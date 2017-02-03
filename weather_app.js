var server = require('dgram').createSocket('udp4');
const ADDRESS = '230.1.2.3';
const srcPort = 8000;
const port = 4000;

server.on('message', (message, rinfo) => {
    console.log('server got a message: ', message.toString(), ' from ', rinfo.address, ':', rinfo.port);
});

server.bind(srcPort, () => {
    server.setBroadcast(true);
    setInterval(multicastNew, 3000);//every 3 seconds
});

function multicastNew() {
    var coldMessage = "it's too cold!";
    var hotMessage = "it's too hot!";
    var niceMessage = "it's nice out, you should go for a walk.";
    var min = 0;
    var max = 110;
    var randomTemp = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randomTemp > 85){
        send(hotMessage);
    } else if (randomTemp < 55){
        send(coldMessage);
    } else {
        send(niceMessage);
    }

    function send(message) {
        message = new Buffer(message);
        server.send(message, 0, message.length, port, ADDRESS, () => {
            console.log('sent ' + message.toString());
        });
    }
    //server.close();

}
