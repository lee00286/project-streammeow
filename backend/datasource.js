import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Establish connection
const POSTGRES_DB = process.env.POSTGRES_DB || "streammeow";
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || "root";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "";
const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    url: POSTGRES_HOST,
    dialect: "postgres",
  }
);
