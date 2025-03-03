import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        const databaseUrl = process.env.Test_DB as string;
        sequelize = new Sequelize(databaseUrl, {
            dialect: 'postgres',
            logging: false
        });
    });

    it('should successfully connect to the database', async () => {
        try {
            await sequelize.authenticate();
            console.log('Database connected successfully!');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    });

    afterAll(async () => {
        // Close the database connection
        await sequelize.close();
    });
});
