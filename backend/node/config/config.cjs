require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
};
