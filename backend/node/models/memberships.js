import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { Creators } from "./creators.js";

export const Memberships = sequelize.define("Memberships", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  benefits: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "cad",
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    allowNull: false,
  },
  priceId: {
    type: DataTypes.STRING,
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
  subscribers: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
});

Memberships.belongsTo(Creators, {
  foreignKey: {
    name: "creatorId",
  },
});
Creators.hasMany(Memberships);
