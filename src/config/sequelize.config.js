require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DB,
    dialect: "postgres",
  },
  test: {
    url: process.env.Test_DB,
    dialect: "postgres",
  },
  production: {
    url: process.env.DB,
    dialect: "postgres",
  },
};
