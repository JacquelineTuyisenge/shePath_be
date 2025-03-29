"use strict";


export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(
    `SELECT id, email FROM users;`
  );

  const userMap = {};
  users[0].forEach((user) => {
    userMap[user.email] = user.id;
  });
  // Insert topics with userId and random UUIDs for topics
  await queryInterface.bulkInsert("topics", [
    {
      id: Sequelize.literal("gen_random_uuid()"), // Random UUID
      content: "Welcome to the community! This is where you can post your topics.",
      imageUrl: "https://example.com/topic-image.jpg",
      userId: userMap["admin@example.com"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: Sequelize.literal("gen_random_uuid()"),
      content: "Discussing the best practices for React development.",
      imageUrl: "https://example.com/react-best-practices.jpg",
      userId: userMap["learner@example.com"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("topics", null, {});
}
