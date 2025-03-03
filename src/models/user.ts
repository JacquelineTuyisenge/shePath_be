import { Sequelize, Model, DataTypes, UUIDV4, Optional } from "sequelize";
import { UserCreationAttributes, UserModelAttributes } from "./attributes";
// import { database_models } from "../server";
// import Models from ".";
import Role from "./role";

export class User extends Model<UserModelAttributes, UserCreationAttributes> {
    public id!: string;
    public userName!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public active!: boolean;
    public gender?: "Male" | "Female" | "Other";
    public birthDate?: Date;
    public phoneNumber?: string;
    public profile?: string;
    public address?: string;
    public country?: string;
    public city?: string;

    public roleDetail?: Role;
    createdAt: any;

    public static associate(models: { Role: typeof Role }) {
        User.belongsTo(models.Role, { as: "roleDetail", foreignKey: "role" });
    }    
      
}

export const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                  model: "roles",
                  key: "id",
                },
            },              
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            gender: {
                type: DataTypes.ENUM("Male", "Female", "Other"),
                allowNull: true,
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
        }
    );

    User.beforeCreate(async (user) => {
        if (!user.role) {
            const learnerRole = await Role.findOne({ where: { name: "Learner" } });
            user.role = learnerRole ? learnerRole.id : "";
        }
    });
    return User;
};

export default User;
