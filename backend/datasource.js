import { Sequelize } from "sequelize";

// Establish connection
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "webgallery.sqlite",
});
