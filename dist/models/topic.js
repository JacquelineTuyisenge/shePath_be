"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTopicModel = exports.Topic = void 0;
const sequelize_1 = require("sequelize");
class Topic extends sequelize_1.Model {
    static associate(models) {
        Topic.belongsTo(models.User, { as: "user", foreignKey: "userId" });
        Topic.hasMany(models.Comment, { as: "comments", foreignKey: "topicId" });
        Topic.hasMany(models.Like, { as: "likes", foreignKey: "topicId" });
    }
}
exports.Topic = Topic;
const initTopicModel = (sequelize) => {
    Topic.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'topics',
        timestamps: true,
    });
};
exports.initTopicModel = initTopicModel;
exports.default = Topic;
