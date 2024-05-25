"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const forumRoutes_1 = __importDefault(require("./routes/forumRoutes"));
const gamificationRoutes_1 = __importDefault(require("./routes/gamificationRoutes"));
const performanceRoutes_1 = __importDefault(require("./routes/performanceRoutes"));
const redis_1 = require("redis");
const util_1 = require("util");
const i18n_1 = __importDefault(require("./config/i18n"));
const syncDatabase_1 = require("./syncDatabase");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(i18n_1.default.init);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
const redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
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
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/courses', courseRoutes_1.default);
app.use('/forums', forumRoutes_1.default);
app.use('/gamification', gamificationRoutes_1.default);
app.use('/performance', performanceRoutes_1.default);
const startServer = async () => {
    await (0, syncDatabase_1.syncDatabase)();
    app.listen(PORT, () => {
        console.log(`Servidor está rodando na porta ${PORT}`);
    });
};
startServer().catch((error) => {
    console.error('Erro ao iniciar o servidor:', error);
});
