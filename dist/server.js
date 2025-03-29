"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importStar(require("./models/user"));
const role_1 = __importStar(require("./models/role"));
const courseCategory_1 = __importStar(require("./models/courseCategory"));
const course_1 = __importStar(require("./models/course"));
const topic_1 = __importStar(require("./models/topic"));
const comment_1 = __importStar(require("./models/comment"));
const like_1 = __importStar(require("./models/like"));
const message_1 = require("./models/message");
const chat_1 = __importStar(require("./models/chat"));
const courseProgress_1 = __importStar(require("./models/courseProgress"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'development';
const Database = env === 'test' ? process.env.TEST_DB :
    env === 'production' ? process.env.DB_PROD :
        process.env.DB;
const sequelize = new sequelize_1.Sequelize(Database, {
    dialect: 'postgres',
    dialectOptions: env === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {},
    logging: false,
});
exports.sequelize = sequelize;
//initialize models
(0, user_1.initUserModel)(sequelize);
(0, role_1.initRoleModel)(sequelize);
(0, courseCategory_1.initCourseCategoryModel)(sequelize);
(0, course_1.initCourseModel)(sequelize);
(0, topic_1.initTopicModel)(sequelize);
(0, comment_1.initCommentModel)(sequelize);
(0, like_1.initLikeModel)(sequelize);
(0, message_1.initMessageModel)(sequelize);
(0, chat_1.initChatModel)(sequelize);
(0, courseProgress_1.initCourseProgressModel)(sequelize);
// **associate models properly**
const associateModels = () => {
    user_1.default.associate({ Role: role_1.default, Topic: topic_1.default, Comment: comment_1.default, Like: like_1.default });
    role_1.default.associate({ User: user_1.default });
    course_1.default.associate({ CourseCategory: courseCategory_1.default });
    courseCategory_1.default.associate({ Course: course_1.default });
    topic_1.default.associate({ User: user_1.default, Comment: comment_1.default, Like: like_1.default });
    comment_1.default.associate({ User: user_1.default, Topic: topic_1.default });
    like_1.default.associate({ User: user_1.default, Topic: topic_1.default });
    chat_1.default.associate({ User: user_1.default });
    courseProgress_1.default.associate({ User: user_1.default, Course: course_1.default });
};
associateModels();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENV === 'test') {
            console.log('🔧 Connecting to the TEST database...');
        }
        else if (process.env.NODE_ENV === 'development') {
            console.log('🌍 Connecting to the DEVELOPMENT database...');
        }
        else {
            console.log('Connecting to PRODUCTION database');
        }
        yield sequelize.authenticate();
        console.log('✅ Database connected successfully!');
        yield sequelize.sync();
        console.log('✅ Database synced successfully!');
    }
    catch (error) {
        console.log('❌ Database connection failed:', error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
