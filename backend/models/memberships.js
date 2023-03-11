import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
// import { User } from "./users.js";
// import { Creator } from "./users.js"; (IS-A relationship from User?)

export const Membership = sequelize.define("Membership", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  benefits: [
    {
      type: DataTypes.STRING,
    },
  ],
  currency: {
    type: DataTypes.STRING,
    defaultValue: "cad",
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
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
  modifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // TODO: change this to foreign key after implementing User model
  creatorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   creatorId: {
  //     type: DataTypes.STRING,
  //     references: {
  //       model: "Creator",
  //       key: "id",
  //     },
  //     allowNull: false, // consider what if creator deletes one's acocunt
  //   },
  //   subscribers: [
  //     {
  //       type: DataTypes.STRING,
  //       references: {
  //         model: "User",
  //         key: "id",
  //       },
  //     },
  //   ],
});

// Membership.belongsTo(User);
// User.hasMany(Membership);
// Membership.belongsTo(Creator);
// Creator.hasMany(Membership);
