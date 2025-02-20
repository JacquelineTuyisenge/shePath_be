import { Sequelize } from "sequelize";
import { initUserModel } from "./user";
import { initRoleModel } from "./role";

const sequelize = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",
});

const models = {
  User: initUserModel(sequelize),
  role: initRoleModel(sequelize),
};

// Initialize associations **after** all models are initialized
Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export default models;
export { sequelize };
