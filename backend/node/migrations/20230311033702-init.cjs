"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    await queryInterface.createTable("Creators", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
    });
    await queryInterface.createTable("Memberships", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      benefits: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "cad",
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull: false,
      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      subscribers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Creators",
          key: "id",
        },
        allowNull: false,
      },
    });
    await queryInterface.createTable("Streamings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      permission: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true, // if null, then no restriction
      },
      isEnded: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Creators",
          key: "id",
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};
