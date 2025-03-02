import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import CourseCategory from "./courseCategory";
import { courseAttributes, courseCreationAttributes } from "./attributes";

export class Course extends Model<courseAttributes, courseCreationAttributes> {
    id!: string;
    title!: string;
    description!: string;
    content!: string;
    categoryId!: string;

    public category?: CourseCategory;
    createdAt: any;

    public static associate(models: { CourseCategory: typeof CourseCategory}) {
        Course.belongsTo(models.CourseCategory, { as: "category", foreignKey: "categoryId" });
    } 
}

export const initCourseModel = (sequelize: Sequelize) => {
    Course.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: CourseCategory,
                    key: "id",
                },
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            tableName: "courses",
        }
    );
    return Course;
};

export default Course;
