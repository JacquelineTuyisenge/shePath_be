import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User, { initUserModel } from './models/user';
import Role, { initRoleModel } from './models/role';
import CourseCategory, {initCourseCategoryModel} from './models/courseCategory';
import Course, { initCourseModel } from './models/course';
import Topic, { initTopicModel } from './models/topic';
import Comment, { initCommentModel } from './models/comment';
import Like, { initLikeModel } from './models/like';
import { initMessageModel } from './models/message';
import Chat, { initChatModel } from './models/chat';
import CourseProgress, { initCourseProgressModel } from './models/courseProgress';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const Database =
    env === 'test' ? process.env.TEST_DB : 
    env === 'production' ? process.env.DB_PROD :
    process.env.DB;

const sequelize = new Sequelize(Database as string, {
    dialect: 'postgres',
    dialectOptions: env === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {},
    logging: false,
});

//initialize models
initUserModel(sequelize);
initRoleModel(sequelize);
initCourseCategoryModel(sequelize);
initCourseModel(sequelize);
initTopicModel(sequelize);
initCommentModel(sequelize);
initLikeModel(sequelize);
initMessageModel(sequelize);
initChatModel(sequelize);
initCourseProgressModel(sequelize);

// **associate models properly**
const associateModels = () => {
    User.associate({ Role, Topic, Comment, Like });
    Role.associate({ User });
    Course.associate({CourseCategory});
    CourseCategory.associate({Course});
    Topic.associate({User, Comment, Like});
    Comment.associate({User, Topic});
    Like.associate({User, Topic});
    Chat.associate({ User });
    CourseProgress.associate({ User, Course})
};
associateModels();

const connectDB = async () => {
    try {

        if (process.env.NODE_ENV === 'test') {
            console.log('🔧 Connecting to the TEST database...');
        } else if (process.env.NODE_ENV === 'development'){
            console.log('🌍 Connecting to the DEVELOPMENT database...');
        } else {
            console.log('Connecting to PRODUCTION database');
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

export {sequelize, connectDB};