import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import forumRoutes from './routes/forumRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import performanceRoutes from './routes/performanceRoutes';
import { createClient } from 'redis';
import { promisify } from 'util';
import i18n from './config/i18n';
import { syncDatabase } from './syncDatabase';

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

const redisClient = createClient();
redisClient.connect().catch(console.error);

const getAsync = promisify(redisClient.get).bind(redisClient);

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinRoom', async (room) => {
        socket.join(room);
        const messages = await getAsync(room);
        if (messages) {
            socket.emit('previousMessages', JSON.parse(messages));
        }
    });

    socket.on('message', (room, message) => {
        redisClient.rPush(room, message);
        io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/forums', forumRoutes);
app.use('/gamification', gamificationRoutes);
app.use('/performance', performanceRoutes);

const startServer = async () => {
    await syncDatabase()
    app.listen(PORT, () => {
        console.log(`Servidor está rodando na porta ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Erro ao iniciar o servidor:', error);
});

