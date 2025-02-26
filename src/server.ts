import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// import Models from './models';
import User, { initUserModel } from './models/user';
import Role, { initRoleModel } from './models/role';

dotenv.config();

const DB = process.env.DB as string;

const sequelize = new Sequelize(DB, {
    dialect: 'postgres',
    logging: false,
});

//initialize models
initUserModel(sequelize);
initRoleModel(sequelize);

// **associate models properly**
const associateModels = () => {
    User.associate({ Role });
    Role.associate({ User });
};
associateModels();

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');
        await sequelize.sync();
        console.log('✅ Database synced successfully!');
    } catch (error) {
        console.log('❌ Database connection failed:', error);
        process.exit(1);
    }
};

// const db_models = Models(sequelize);


// Object.keys(db_models).forEach((key) => {
// 	// @ts-expect-error ignore expected errors
// 	if (db_models[key].associate) {
// 		// @ts-expect-error ignore expected errors
// 		db_models[key].associate(db_models);
// 	}
// });

// export const database_models = { ...db_models };

export {sequelize, connectDB};