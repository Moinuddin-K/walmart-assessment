import env from 'dotenv';
env.config();

export default {
    database: {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        dialect: process.env.DIALECT,
        db_port: process.env.DB_PORT,
        app_port: process.env.APP_PORT
    },
};