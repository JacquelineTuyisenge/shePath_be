import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import { User } from "./user";
import { Topic } from "./topic";

export class Like extends Model {
    public id!: string;
    public userId!: string;
    public topicId!: string;

    public static associate(models: { User: typeof User; Topic: typeof Topic }) {
        Like.belongsTo(models.User, { as: "user", foreignKey: "userId" });
        Like.belongsTo(models.Topic, { as: "topic", foreignKey: "topicId" });
    }
}

export const initLikeModel = (sequelize: Sequelize) => {
    Like.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            topicId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "likes",
            timestamps: true,
        }
    );
};

export default Like;
