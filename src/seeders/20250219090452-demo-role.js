"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      { id: Sequelize.literal("gen_random_uuid()"), name: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal("gen_random_uuid()"), name: "Learner", createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal("gen_random_uuid()"), name: "Mentor", createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal("gen_random_uuid()"), name: "Parent", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
