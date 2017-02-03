#!/usr/bin/env node
var dgram = require('dgram');
var client = dgram.createSocket({type: 'udp4', reuseAddr: true});
const PORT = 4000;
const MULTICAST_ADDRESS = '230.1.2.3';
var ADDRESS;

client.on('message', (message, rinfo) => {
   console.log('got message: ', message.toString(), 'from ', rinfo.address + ':'
       + rinfo.port);
});

client.on('listening', () => {
   ADDRESS = client.address();
   console.log('udp client listening on', ADDRESS.address + ':' + ADDRESS.port);
   client.setBroadcast(true);
});

client.bind(PORT, () => {
   client.addMembership(MULTICAST_ADDRESS);
});

