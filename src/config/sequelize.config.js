require("dotenv").config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    url: process.env.DB,
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DB,
    dialect: "postgres",
  },
  production: {
    url: process.env.DB_PROD,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
};
