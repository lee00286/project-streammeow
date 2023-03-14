require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || "root",
    password: process.env.POSTGRES_PASSWORd || null,
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USERNAME || "root",
    password: process.env.POSTGRES_PASSWORd || null,
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USERNAME || "root",
    password: process.env.POSTGRES_PASSWORd || null,
    database: process.env.POSTGRES_DB || "streammeow",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
};
