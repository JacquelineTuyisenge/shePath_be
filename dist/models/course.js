"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCourseModel = exports.Course = void 0;
const sequelize_1 = require("sequelize");
const courseCategory_1 = __importDefault(require("./courseCategory"));
class Course extends sequelize_1.Model {
    static associate(models) {
        Course.belongsTo(models.CourseCategory, { as: "category", foreignKey: "categoryId" });
    }
}
exports.Course = Course;
const initCourseModel = (sequelize) => {
    Course.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        categoryId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: courseCategory_1.default,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    }, {
        sequelize,
        tableName: "courses",
    });
    return Course;
};
exports.initCourseModel = initCourseModel;
exports.default = Course;
