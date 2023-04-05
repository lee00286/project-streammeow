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
    await queryInterface.bulkInsert("Users", [
      {
        name: "User 1",
        email: "user1@gmail.com",
        password: generatePassword("user1"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 2",
        email: "user2@gmail.com",
        password: generatePassword("user2"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 3",
        email: "user3@gmail.com",
        password: generatePassword("user3"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 4",
        email: "user4@gmail.com",
        password: generatePassword("user4"),
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
    await queryInterface.bulkInsert("Creators", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: users[0][1].id,
      },
    ]);
    await queryInterface.bulkInsert("Memberships", [
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
      {
        name: "Master",
        description: "Master membership",
        benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
        currency: "cad",
        price: 7.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 2,
      },
    ]);
    const memberships = await queryInterface.sequelize.query(
      `SELECT id from "Memberships";`
    );
    return queryInterface.bulkInsert("Posts", [
      {
        title: "My first post!",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
        permission: null,
        likes: 10,
        dislikes: 2,
        comments: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 1,
      },
      {
        title: "A members only post",
        description:
          "Hello everyone! I just wanted to say thank you for supporting me through these tough times.",
        permission: [memberships[0][0].id, memberships[0][1].id],
        likes: 5,
        dislikes: 10,
        comments: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 1,
      },
      {
        title: "Something special for my Standard+ members",
        description: "This is a secret post.",
        permission: [memberships[0][1].id],
        likes: 3,
        dislikes: 0,
        comments: null,
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
