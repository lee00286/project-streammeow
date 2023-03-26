import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { User } from "./users.js";
// import { Creator } from "./users.js"; (IS-A relationship from User?)

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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.STRING,
    references: {
      model: "Users", // TODO: change to Creator
      key: "id",
    },
    allowNull: false, // TODO: consider what if creator deletes acocunt
  },
});

Streamings.belongsTo(User);
User.hasMany(Streamings);
// Streamings.belongsTo(Creator);
// Creator.hasMany(Streamings);
