
import sequelize from './config/database';
import Course from './models/course';
import Forum from './models/forum';
import ForumPost from './models/forumPost';
import User from './models/user';




User.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(User, { foreignKey: 'instructorId' });

Course.hasMany(Forum, { foreignKey: 'courseId' });
Forum.belongsTo(Course, { foreignKey: 'courseId' });

ForumPost.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ForumPost, { foreignKey: 'userId' });

ForumPost.belongsTo(Forum, { foreignKey: 'forumId' });
Forum.hasMany(ForumPost, { foreignKey: 'forumId' });

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

export { sequelize, syncDatabase, User, Course };