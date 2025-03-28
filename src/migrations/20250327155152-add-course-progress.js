// src/migrations/20250327123456-add-course-progress.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("course_progress", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      progress: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add unique constraint for userId and courseId combination
    await queryInterface.addConstraint("course_progress", {
      fields: ["userId", "courseId"],
      type: "unique",
      name: "course_progress_userId_courseId_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course_progress");
  },
};