import express from 'express';
import cors from 'cors';

import connectToMongoDB from './resources/mongoose';
import createWSServer from './resources/websocket';

import cloudRouter from './routes/cloud';
import stockRouter from './routes/stock';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/cloud', cloudRouter);
app.use('/stock', stockRouter);

const server = app.listen(4000, () => console.log('Server running on port 4000....'));

connectToMongoDB();
createWSServer(server);
