"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
// import { database_models } from "../server";
// import Models from ".";
const role_1 = __importDefault(require("./role"));
class User extends sequelize_1.Model {
    static associate(models) {
        User.belongsTo(models.Role, { as: "roleDetail", foreignKey: "role" });
    }
}
exports.User = User;
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "roles",
                key: "id",
            },
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        gender: {
            type: sequelize_1.DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true,
        },
        birthDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        profile: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
    });
    User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user.role) {
            const learnerRole = yield role_1.default.findOne({ where: { name: "Learner" } });
            user.role = learnerRole ? learnerRole.id : "";
        }
    }));
    return User;
};
exports.initUserModel = initUserModel;
exports.default = User;
