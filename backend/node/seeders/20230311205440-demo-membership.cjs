"use strict";

const bcrypt = require("bcryptjs");

const generatePassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: generatePassword("user1"),
        subscription: [-1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 2",
        email: "user2@gmail.com",
        password: generatePassword("user2"),
        subscription: [-1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 3",
        email: "user3@gmail.com",
        password: generatePassword("user3"),
        subscription: [-1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const users = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    );
    await queryInterface.bulkInsert("Creators", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: users[0][0].id,
      },
    ]);
    return queryInterface.bulkInsert("Memberships", [
      {
        name: "Basic",
        description: "Basic membership",
        benefits: ["Benefit 1", "Benefit 2"],
        currency: "cad",
        price: 2.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 1,
      },
      {
        name: "Standard",
        description: "Standard membership",
        benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
        currency: "cad",
        price: 5.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Memberships", null, {});
  },
};
