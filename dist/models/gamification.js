"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
class Gamification extends sequelize_1.Model {
}
Gamification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    points: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    badges: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '',
    },
}, {
    sequelize: database_1.default,
    tableName: 'gamifications',
});
user_1.default.hasOne(Gamification, { foreignKey: 'userId' });
Gamification.belongsTo(user_1.default, { foreignKey: 'userId' });
exports.default = Gamification;
