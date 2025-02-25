import { Sequelize, Model, DataTypes, UUIDV4, Optional } from "sequelize";
import User from "./user";
import { roleCreationAttributes, roleModelAttributes } from "./attributes";
// import { database_models } from "../server";

export class Role extends Model<roleModelAttributes, roleCreationAttributes> {
    id!: string;
    name!: string;

    public static associate(models: { User: typeof User }) {
        Role.hasMany(models.User, { as: "Users", foreignKey: "role"});
    }
}

export const initRoleModel = (sequelize: Sequelize) => {
    Role.init(
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
            },
        },
        {
            sequelize,
            tableName: "roles"
        }
    );
    return Role;
};

export default Role;