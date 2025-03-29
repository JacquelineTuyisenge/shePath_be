import { Sequelize, Model, DataTypes, UUIDV4, Optional } from "sequelize";
import { User } from './user';
import { Topic } from './topic';

export class Comment extends Model {
  public id!: number;
  public content!: string;
  public userId!: string;
  public topicId!: string;

  public static associate(models: { User: typeof User; Topic: typeof Topic }) {
    Comment.belongsTo(models.User, { as: "user", foreignKey: "userId"});
    Comment.belongsTo(models.Topic, { as: "topic", foreignKey: "topicId"});
  }
}


export const initCommentModel = (sequelize: Sequelize) => {

    Comment.init(
        {
            id: { 
                type: DataTypes.UUID, 
                defaultValue: UUIDV4,
                primaryKey: true, 
                allowNull: false,
            },
            content: { 
                type: DataTypes.STRING, 
                allowNull: false 
            },
            userId: { 
                type: DataTypes.UUID, 
                allowNull: false 
            },
            topicId: {
                type: DataTypes.UUID,

            }
        },
        {
            sequelize,
            tableName: 'comments',
            timestamps: true,
        }
    );
}

export default Comment;
