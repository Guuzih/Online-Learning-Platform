import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface BadgeAttributes {
    id?: number;
    userId: number;
    badgeId: number;
}

class Badge extends Model<BadgeAttributes> implements BadgeAttributes {
    public id!: number;
    public userId!: number;
    public badgeId!: number;

}

Badge.init(
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
        badgeId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

    },
    {
        sequelize,
        tableName: 'badge',
    }
);

User.hasOne(Badge, { foreignKey: 'userId' });
Badge.belongsTo(User, { foreignKey: 'userId' });

export default Badge;
