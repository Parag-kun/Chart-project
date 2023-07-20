import { Server } from 'node:http';
import { WebSocketServer } from 'ws';

import { updateStockData } from '../controllers/stock';
import { updateCloudData } from '../controllers/cloud';

export default (server: Server) => {
    const wsServer = new WebSocketServer({ server });

    setInterval(async () => {
        console.log('Updating data')
        const newStocks = await updateStockData();
        const newClouds = await updateCloudData();

        wsServer.clients.forEach(socket => socket.send(JSON.stringify({ newStocks, newClouds })));
    }, 5_000);

    wsServer.on("connection", socket => {
        socket.send('Hello client');

        socket.on('message', data => {
            console.log(data.toString());
        });

        socket.on('close', (code, reason) => {
            console.log('Connection closed', code, reason);
        });

        socket.on('error', err => console.error(err));
    });

    wsServer.on('close', () => console.log('Websocket disconnected'));
    wsServer.on('error', err => console.error(err));
};
