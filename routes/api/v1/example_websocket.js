const WebsocketLog = require('../../../models/websocket');
const WebSocket = require('ws');
const ws = new WebSocket.Server({port: 8080});


ws.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);

        let newWebsocketLog = new WebsocketLog();
        newWebsocketLog.received_message = message;
        newWebsocketLog.save();
    });

    ws.send('ho!');
});



