var dgram = require('dgram');
var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
const PORT = 4000;
const MULTICAST_ADDRESS = '230.1.2.3';
var address;

client.on('message', (message, rinfo) => {
   console.log('got message: ', message.toString(), 'from ', rinfo.address + ':'
       + rinfo.port);
});

client.on('listening', () => {
   address = client.address();
   console.log('udp client listening on', address.address + ':' + address.port);
   client.setBroadcast(true);
});

client.bind(PORT, () => {
   client.addMembership(MULTICAST_ADDRESS);
});

