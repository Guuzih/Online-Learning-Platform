"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
if (!dbHost || !dbUser || !dbPassword || !dbDatabase) {
    const errorId = Math.random().toString(36).substring(2, 15);
    throw new Error(`Variáveis de ambiente não definidas. ID do erro: ${errorId}`);
}
// Construa a URL de conexão com a opção sslmode=require
const databaseUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${process.env.DB_PORT}/${dbDatabase}?sslmode=require`;
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
