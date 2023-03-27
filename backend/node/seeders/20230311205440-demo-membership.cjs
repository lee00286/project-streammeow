"use strict";

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
    return queryInterface.bulkInsert("Memberships", [
      {
        name: "Basic",
        description: "Basic membership",
        benefits: ["Benefit 1", "Benefit 2"],
        currency: "cad",
        price: 2.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: "1",
      },
      {
        name: "Standard",
        description: "Standard membership",
        benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
        currency: "cad",
        price: 5.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: "1",
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
