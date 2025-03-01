"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categories", [
      {
        id: "b1e4e1e4-6b8d-43c1-8b7a-8d6c81c3a12e",
        name: "Awareness & Education",
        description: "Educating parents and girls about the importance of education.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e2e2bfc6-2a94-4f16-9a84-b689cfab4ef9",
        name: "Financial Literacy",
        description: "Courses on saving, budgeting, and small business skills.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5adf94a8-0eaf-4773-902c-0c35c8ef6f3e",
        name: "Basic Education",
        description: "Reading, writing, and math skills for out-of-school learners.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
