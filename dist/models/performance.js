"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
const course_1 = __importDefault(require("./course"));
class Performance extends sequelize_1.Model {
}
Performance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    progress: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    score: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    tableName: 'performances',
});
user_1.default.hasMany(Performance, { foreignKey: 'userId' });
Performance.belongsTo(user_1.default, { foreignKey: 'userId' });
course_1.default.hasMany(Performance, { foreignKey: 'courseId' });
Performance.belongsTo(course_1.default, { foreignKey: 'courseId' });
exports.default = Performance;
