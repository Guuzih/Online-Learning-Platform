import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Course from './course';

interface ForumAttributes {
    id?: number;
    title: string;
    courseId: number;
}

class Forum extends Model<ForumAttributes> implements ForumAttributes {
    public id!: number;
    public title!: string;
    public courseId!: number;
}

Forum.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'forums',
    }
);

Course.hasMany(Forum, { foreignKey: 'courseId' });
Forum.belongsTo(Course, { foreignKey: 'courseId' });

export default Forum;

