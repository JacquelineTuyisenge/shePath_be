"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommentModel = exports.Comment = void 0;
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
    static associate(models) {
        Comment.belongsTo(models.User, { as: "user", foreignKey: "userId" });
        Comment.belongsTo(models.Topic, { as: "topic", foreignKey: "topicId" });
    }
}
exports.Comment = Comment;
const initCommentModel = (sequelize) => {
    Comment.init({
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
        userId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        },
        topicId: {
            type: sequelize_1.DataTypes.UUID,
        }
    }, {
        sequelize,
        tableName: 'comments',
        timestamps: true,
    });
};
exports.initCommentModel = initCommentModel;
exports.default = Comment;
