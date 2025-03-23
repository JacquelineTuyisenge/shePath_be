import { Sequelize, Model, DataTypes, UUIDV4, Optional } from "sequelize";
import { User } from './user';
import { Comment } from './comment';
import Like from "./like";

export class Topic extends Model {
  public id!: number;
  public content!: string;
  public imageUrl!: string | null;
  public userId!: string;

  public static associate(models: { User: typeof User; Comment: typeof Comment; Like: typeof Like }) {
    Topic.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    Topic.hasMany(models.Comment, { as: "comments", foreignKey: "topicId" });
    Topic.hasMany(models.Like, { as: "likes", foreignKey: "topicId" });
  }
}


export const initTopicModel = (sequelize: Sequelize) => {

    Topic.init(
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
            imageUrl: { 
                type: DataTypes.STRING, 
                allowNull: true 
            },
            userId: { 
                type: DataTypes.UUID, 
                allowNull: false 
            },
        },
        {
            sequelize,
            tableName: 'topics',
            timestamps: true,
        }
    );
}

export default Topic;
