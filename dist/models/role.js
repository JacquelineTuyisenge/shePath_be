"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoleModel = exports.Role = void 0;
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
    static associate(models) {
        Role.hasMany(models.User, { as: "Users", foreignKey: "role" });
    }
}
exports.Role = Role;
const initRoleModel = (sequelize) => {
    Role.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "roles"
    });
    return Role;
};
exports.initRoleModel = initRoleModel;
exports.default = Role;
