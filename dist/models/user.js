"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const course_1 = __importDefault(require("./course"));
class User extends sequelize_1.Model {
    static async hashPassword(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async comparePassword(password) {
        return await bcrypt_1.default.compare(password, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    hooks: {
        beforeSave: async (user) => {
            if (user.password) {
                user.password = await User.hashPassword(user.password);
            }
        },
    },
});
User.hasMany(course_1.default, { foreignKey: 'instructorId' });
course_1.default.belongsTo(User, { foreignKey: 'instructorId' });
exports.default = User;
