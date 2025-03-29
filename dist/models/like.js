"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLikeModel = exports.Like = void 0;
const sequelize_1 = require("sequelize");
class Like extends sequelize_1.Model {
    static associate(models) {
        Like.belongsTo(models.User, { as: "user", foreignKey: "userId" });
        Like.belongsTo(models.Topic, { as: "topic", foreignKey: "topicId" });
    }
}
exports.Like = Like;
const initLikeModel = (sequelize) => {
    Like.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        topicId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "likes",
        timestamps: true,
    });
};
exports.initLikeModel = initLikeModel;
exports.default = Like;
