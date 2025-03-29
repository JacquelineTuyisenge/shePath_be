import { Sequelize, Model, DataTypes, UUIDV4, Optional } from "sequelize";

export class Message extends Model {
    public id!: number;
    public email!: string;
    public message!: string | null;
}

export const initMessageModel = (sequelize: Sequelize) => {
    Message.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "messages",
        }
    )
};

export default Message;