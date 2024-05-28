import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('online_learning', 'postgres', "123456", {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

export default sequelize;
