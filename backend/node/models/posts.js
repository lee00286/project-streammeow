import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { Creators } from "./creators.js";

export const Posts = sequelize.define("Posts", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  permission: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true, // if null, then no restriction
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  comments: {
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
});

Posts.belongsTo(Creators, {
  foreignKey: {
    name: "creatorId",
  },
});
Creators.hasMany(Posts);
