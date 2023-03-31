import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
// import { User } from "./users.js";
import { Creators } from "./creators.js";

export const Streamings = sequelize.define("Streamings", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  permission: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true, // if null, then no restriction
  },
  isEnded: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
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
  // creatorId: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

// Streamings.belongsTo(User);
// User.hasMany(Streamings);
Streamings.belongsTo(Creators, {
  foreignKey: {
    name: "creatorId",
  },
});
Creators.hasMany(Streamings);
