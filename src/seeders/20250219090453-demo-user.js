"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch role IDs
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles;`
    );

    const roleMap = {};
    roles[0].forEach((role) => {
      roleMap[role.name] = role.id;
    });

    await queryInterface.bulkInsert("users", [
      {
        id: Sequelize.literal("gen_random_uuid()"),
        userName: "adminuser", // Added userName
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: "hashed_password_here", // Replace with actual hashed password
        role: roleMap["Admin"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        userName: "learneruser", // Added userName
        firstName: "Learner",
        lastName: "User",
        email: "learner@example.com",
        password: "hashed_password_here",
        role: roleMap["Learner"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        userName: "mentoruser", // Added userName
        firstName: "Mentor",
        lastName: "User",
        email: "mentor@example.com",
        password: "hashed_password_here",
        role: roleMap["Mentor"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        userName: "parentuser", // Added userName
        firstName: "Parent",
        lastName: "User",
        email: "parent@example.com",
        password: "hashed_password_here",
        role: roleMap["Parent"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
