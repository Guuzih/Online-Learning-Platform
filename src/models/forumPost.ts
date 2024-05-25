import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Forum from './forum';

interface ForumPostAttributes {
    id?: number;
    content: any;
    title: string;
    userId: number;
    forumId: number;
}

class ForumPost extends Model<ForumPostAttributes> implements ForumPostAttributes {
    public id!: number;
    public title!: string;
    public forumId!: number;
    public userId!: number;
    public content!: any;
}

ForumPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        forumId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'forumsPosts',
    }
);

ForumPost.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ForumPost, { foreignKey: 'userId' });

ForumPost.belongsTo(Forum, { foreignKey: 'forumId' });
Forum.hasMany(ForumPost, { foreignKey: 'forumId' });

export interface ForumPostQueryOptions {
    where?: {
        forumId: number;
    };
}

export default ForumPost;

