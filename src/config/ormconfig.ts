import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER_PROD,
    password: process.env.CONTRASENASQL,
    database: process.env.DATABASESQL,
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
});

export default AppDataSource;
