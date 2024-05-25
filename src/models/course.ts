import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CourseAttributes {
    id?: number;
    title: string;
    description: string;
    content: string;
    instructorId: number;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public content!: string;
    public instructorId!: number;
}

Course.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        instructorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'courses',
    }
);

export default Course;

