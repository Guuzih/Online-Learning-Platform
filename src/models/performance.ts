import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Course from './course';

interface PerformanceAttributes {
    id?: number;
    userId: number;
    courseId: number;
    progress: number;
    score: number;
}

class Performance extends Model<PerformanceAttributes> implements PerformanceAttributes {
    public id!: number;
    public userId!: number;
    public courseId!: number;
    public progress!: number;
    public score!: number;
}

Performance.init(
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
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        progress: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'performances',
    }
);

User.hasMany(Performance, { foreignKey: 'userId' });
Performance.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(Performance, { foreignKey: 'courseId' });
Performance.belongsTo(Course, { foreignKey: 'courseId' });

export default Performance;
