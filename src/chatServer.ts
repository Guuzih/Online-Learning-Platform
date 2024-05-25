import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import redis from 'redis';
import { promisify } from 'util';
import i18n from './config/i18n';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(i18n.init);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});


const getAsync = promisify(redisClient.get).bind(redisClient);

io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinRoom', async (room: string) => {
        socket.join(room);
        const messages = await getAsync(room);
        if (messages) {
            socket.emit('previousMessages', JSON.parse(messages));
        }
    });

    socket.on('message', (room: string, message: string) => {
        redisClient.rPush(room, message);
        io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.use(express.json());

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
