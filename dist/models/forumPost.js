"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = __importDefault(require("./user"));
const forum_1 = __importDefault(require("./forum"));
class ForumPost extends sequelize_1.Model {
}
ForumPost.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    forumId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'forumsPosts',
});
ForumPost.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(ForumPost, { foreignKey: 'userId' });
ForumPost.belongsTo(forum_1.default, { foreignKey: 'forumId' });
forum_1.default.hasMany(ForumPost, { foreignKey: 'forumId' });
exports.default = ForumPost;
