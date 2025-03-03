"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("courses", [
      {
        id: uuidv4(),
        title: "Why Education Matters",
        description: "A short course explaining the benefits of education for girls.",
        content: "werfgfdwetyujhgre56uikjhg",
        categoryId: "b1e4e1e4-6b8d-43c1-8b7a-8d6c81c3a12e", // Awareness & Education
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Money Management Basics",
        description: "Understanding money, saving, and planning for the future.",
        content: "werfgfdwetyujhgre56uikjhg",
        categoryId: "e2e2bfc6-2a94-4f16-9a84-b689cfab4ef9", // Financial Literacy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Learn to Read and Write",
        description: "Simple lessons to help those who missed school.",
        content: "werfgfdwetyujhgre56uikjhg",
        categoryId: "5adf94a8-0eaf-4773-902c-0c35c8ef6f3e", // Basic Education
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
