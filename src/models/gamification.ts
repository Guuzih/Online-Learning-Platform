import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface GamificationAttributes {
    id?: number;
    userId: number;
    points: number;
    badges: string;
}

class Gamification extends Model<GamificationAttributes> implements GamificationAttributes {
    public id!: number;
    public userId!: number;
    public points!: number;
    public badges!: string;
}

Gamification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        badges: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
    },
    {
        sequelize,
        tableName: 'gamifications',
    }
);

User.hasOne(Gamification, { foreignKey: 'userId' });
Gamification.belongsTo(User, { foreignKey: 'userId' });

export default Gamification;
