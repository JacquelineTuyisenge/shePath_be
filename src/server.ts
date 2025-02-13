import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DB as string;

const sequelize = new Sequelize(DB, {
    dialect: 'postgres',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.log('❌ Database connection failed:', error);
        process.exit(1);
    }
};

export {sequelize, connectDB};