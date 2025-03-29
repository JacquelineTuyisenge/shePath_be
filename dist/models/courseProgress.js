"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCourseProgressModel = exports.CourseProgress = void 0;
// src/models/courseProgress.ts
const sequelize_1 = require("sequelize");
class CourseProgress extends sequelize_1.Model {
    static associate(models) {
        CourseProgress.belongsTo(models.User, { as: "user", foreignKey: "userId" });
        CourseProgress.belongsTo(models.Course, { as: "course", foreignKey: "courseId" });
    }
}
exports.CourseProgress = CourseProgress;
const initCourseProgressModel = (sequelize) => {
    CourseProgress.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        courseId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "courses",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        progress: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            },
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: "CourseProgress",
        tableName: "course_progress",
        timestamps: true,
        updatedAt: "updatedAt",
        createdAt: false, // Only need updatedAt
    });
    return CourseProgress;
};
exports.initCourseProgressModel = initCourseProgressModel;
exports.default = CourseProgress;
