"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMessageModel = exports.Message = void 0;
const sequelize_1 = require("sequelize");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
const initMessageModel = (sequelize) => {
    Message.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "messages",
    });
};
exports.initMessageModel = initMessageModel;
exports.default = Message;
