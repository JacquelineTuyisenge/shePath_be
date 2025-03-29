"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChatModel = exports.Chat = void 0;
const sequelize_1 = require("sequelize");
class Chat extends sequelize_1.Model {
    static associate(models) {
        Chat.belongsTo(models.User, { as: "sender", foreignKey: "senderId" });
        Chat.belongsTo(models.User, { as: "receiver", foreignKey: "receiverId" });
    }
}
exports.Chat = Chat;
const initChatModel = (sequelize) => {
    Chat.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        senderId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        receiverId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Chat",
        tableName: "chats",
    });
    return Chat;
};
exports.initChatModel = initChatModel;
exports.default = Chat;
