import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Establish connection
const POSTGRES_DB = process.env.POSTGRES_DB || "streammeow";
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || null;
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_PORT = process.env.POSTGRES_PORT || "5432";

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: "postgres",
  }
);

// export const sequelize = new Sequelize(
//   `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
//   // `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`,
//   {
//     dialect: "postgres",
//     // anything else you want to pass
//   }
// );
