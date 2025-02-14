import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";

export class User extends Model {
    public id!: string;
    public userName!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: "lumina" | "beacon" | "pillar" | "overseer";
    public active!: boolean;
    public gender?: "Male" | "Female" | "Other";
    public birthDate?: Date;
    public phoneNumber?: string;
    public profile?: string;
    public address?: string;
    public country?: string;
    public city?: string;
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
                type: DataTypes.ENUM("lumina", "beacon", "pillar", "overseer"),
                allowNull: false,
                defaultValue: "lumina",
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
};

export default User;
