import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.JSON,
  },
  subscription: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  auth0: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
