import sequelize from "sequelize";
import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import { UserModel, UserCreationAttributes } from "./attributes/models";

export class User extends Model<UserModel, UserCreationAttributes> {
    public id!: string;
	public userName!: string;
	public firstName!: string;
	public lastName!: string;
	public email!: string;
	public password!: string;
	public confirmPassword!: string;
	public role!: string;
	public active!: boolean;
	public gender!: string;
	public birthDate!: Date;
	public phoneNumber!: string;
	public profile!: string;
	public address!: string;
	public country!: string;
	public city!: string;
}

const user_model = (sequelize: Sequelize) => {
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
			confirmPassword: {
				type: DataTypes.STRING,
				allowNull: false,
			},
            role: {
                type: DataTypes.ENUM("lumina", "beacon", "pillar", "overseer"), // default user, mentor, parent, admin
                allowNull: false,
                defaultValue: "lumina"
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
				type: DataTypes.DATE, // Stores date
				allowNull: true,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			profile: {
				type: DataTypes.STRING, // URL to profile picture
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
            tableName: "users"
        }
    );
};

export default user_model;