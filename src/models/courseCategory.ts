import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import { courseCategoryAttributes, courseCategoryCreationAttributes } from "./attributes";
import Course from "./course";

export class CourseCategory extends Model<courseCategoryAttributes, courseCategoryCreationAttributes> {
    id!: string;
    name!: string;
    description!: string;

    public static associate(models: { Course: typeof Course }) {
        CourseCategory.hasMany(models.Course, { as: "Courses", foreignKey: "categoryId"});
    }
}

export const initCourseCategoryModel = (sequelize: Sequelize) => {
    CourseCategory.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "categories",
        }
    );
    return CourseCategory;
};

export default CourseCategory;
