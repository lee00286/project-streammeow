import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
// import { User } from "./users.js";
// import { Creator } from "./users.js"; (IS-A relationship from User?)

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
  // TODO: change this to foreign key after implementing User model
  creatorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // creatorId: {
  //   type: DataTypes.STRING,
  //   references: {
  //     model: "Creator",
  //     key: "id",
  //   },
  //   allowNull: false, // TODO: consider what if creator deletes acocunt
  // },
  // subscribers: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   references: {
  //     model: "User",
  //     key: "id",
  //   },
  //   allowNull: true,
  // },
});

// Memberships.belongsTo(User);
// User.hasMany(Memberships);
// Memberships.belongsTo(Creator);
// Creator.hasMany(Memberships);
