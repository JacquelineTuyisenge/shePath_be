"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCourseCategoryModel = exports.CourseCategory = void 0;
const sequelize_1 = require("sequelize");
class CourseCategory extends sequelize_1.Model {
    static associate(models) {
        CourseCategory.hasMany(models.Course, { as: "Courses", foreignKey: "categoryId" });
    }
}
exports.CourseCategory = CourseCategory;
const initCourseCategoryModel = (sequelize) => {
    CourseCategory.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "categories",
    });
    return CourseCategory;
};
exports.initCourseCategoryModel = initCourseCategoryModel;
exports.default = CourseCategory;
