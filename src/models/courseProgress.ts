// src/models/courseProgress.ts
import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import User from "./user";
import Course from "./course";

export interface CourseProgressAttributes {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  updatedAt?: Date;
}

export interface CourseProgressCreationAttributes extends Omit<CourseProgressAttributes, "id" > {}

export class CourseProgress extends Model<CourseProgressAttributes, CourseProgressCreationAttributes> {
  public id!: string;
  public userId!: string;
  public courseId!: string;
  public progress!: number;
  public completed!: boolean;
  public updatedAt!: Date;

  public static associate(models: { User: typeof User; Course: typeof Course }) {
    CourseProgress.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    CourseProgress.belongsTo(models.Course, { as: "course", foreignKey: "courseId" });
  }
}

export const initCourseProgressModel = (sequelize: Sequelize) => {
  CourseProgress.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      progress: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "CourseProgress",
      tableName: "course_progress",
      timestamps: true,
      updatedAt: "updatedAt",
      createdAt: false, // Only need updatedAt
    }
  );
  return CourseProgress;
};

export default CourseProgress;