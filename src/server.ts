import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// import Models from './models';
import User, { initUserModel } from './models/user';
import Role, { initRoleModel } from './models/role';
import CourseCategory, {initCourseCategoryModel} from './models/courseCategory';
import Course, { initCourseModel } from './models/course';

dotenv.config();

const Database = process.env.NODE_ENV === 'test' ? process.env.Test_DB as string : process.env.DB as string;

const sequelize = new Sequelize(Database, {
    dialect: 'postgres',
    logging: false,
});

//initialize models
initUserModel(sequelize);
initRoleModel(sequelize);
initCourseCategoryModel(sequelize);
initCourseModel(sequelize);

// **associate models properly**
const associateModels = () => {
    User.associate({ Role });
    Role.associate({ User });
    Course.associate({CourseCategory});
    CourseCategory.associate({Course});
};
associateModels();

const connectDB = async () => {
    try {

        if (process.env.NODE_ENV === 'test') {
            console.log('🔧 Connecting to the TEST database...');
        } else {
            console.log('🌍 Connecting to the PRODUCTION database...');
        }

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