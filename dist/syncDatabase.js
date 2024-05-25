"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.User = exports.syncDatabase = exports.sequelize = void 0;
const database_1 = __importDefault(require("./config/database"));
exports.sequelize = database_1.default;
const course_1 = __importDefault(require("./models/course"));
exports.Course = course_1.default;
const forum_1 = __importDefault(require("./models/forum"));
const forumPost_1 = __importDefault(require("./models/forumPost"));
const user_1 = __importDefault(require("./models/user"));
exports.User = user_1.default;
user_1.default.hasMany(course_1.default, { foreignKey: 'instructorId' });
course_1.default.belongsTo(user_1.default, { foreignKey: 'instructorId' });
course_1.default.hasMany(forum_1.default, { foreignKey: 'courseId' });
forum_1.default.belongsTo(course_1.default, { foreignKey: 'courseId' });
forumPost_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(forumPost_1.default, { foreignKey: 'userId' });
forumPost_1.default.belongsTo(forum_1.default, { foreignKey: 'forumId' });
forum_1.default.hasMany(forumPost_1.default, { foreignKey: 'forumId' });
const syncDatabase = async () => {
    try {
        await database_1.default.sync({ force: true });
        console.log('Database synchronized successfully.');
    }
    catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};
exports.syncDatabase = syncDatabase;
