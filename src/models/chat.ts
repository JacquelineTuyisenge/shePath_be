import { Sequelize, Model, DataTypes, UUIDV4 } from "sequelize";
import User from "./user";

export class Chat extends Model {
    public id!: string;
    public senderId!: string;
    public receiverId!: string;
    public content!: string;
    public createdAt!: Date;

    public static associate(models: { User: typeof User }) {
        Chat.belongsTo(models.User, { as: "sender", foreignKey: "senderId" });
        Chat.belongsTo(models.User, { as: "receiver", foreignKey: "receiverId" });
    }
}

export const initChatModel = (sequelize: Sequelize) => {
    Chat.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            senderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            receiverId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Chat",
            tableName: "chats",
        }
    );
    return Chat;
};

export default Chat;