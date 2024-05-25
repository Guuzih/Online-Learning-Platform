"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('online_learning', 'postgres', "123456", {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});
exports.default = sequelize;
