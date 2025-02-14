"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users", // Ensured table name is lowercase to match the model
      [
        {
          id: uuidv4(),
          userName: "johndoe", // Renamed `username` to `userName`
          firstName: "John", // Added missing `firstName`
          lastName: "Doe", // Added missing `lastName`
          email: "johndoe@example.com",
          password: "hashedpassword123", 
          role: "lumina",
          active: true,
          gender: "Male",
          birthDate: new Date("1990-01-01"),
          phoneNumber: "+1234567890",
          profile: "profile-url",
          address: "123 Main Street",
          country: "Wonderland",
          city: "Dream City",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          userName: "janedoe", // Renamed `username` to `userName`
          firstName: "Jane", // Added missing `firstName`
          lastName: "Doe", // Added missing `lastName`
          email: "janedoe@example.com",
          password: "hashedpassword456",
          role: "beacon",
          active: true,
          gender: "Female",
          birthDate: new Date("1995-05-05"),
          phoneNumber: "+0987654321",
          profile: "profile-url",
          address: "456 Elm Street",
          country: "Wonderland",
          city: "Magic City",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {}); // Ensured lowercase table name
  },
};
