require("dotenv").config();

module.exports = {
  development: {
    host: process.env.DATABASE_DEVELOPMENT_HOST,
    port: process.env.DATABASE_DEVELOPMENT_PORT,
    username: process.env.DATABASE_DEVELOPMENT_USERNAME,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    dialect: "postgres",
  },
  production: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: "postgres",
  },
};
