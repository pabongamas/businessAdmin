"use strict";
const { USER_TABLE } = require("./../models/user.model");
const { ROLS_TABLE } = require("./../models/rol.model");
const { USERS_ROLES_TABLE } = require("./../models/userRol.model");
const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: "pabongamas@gmail.com",
        password: await bcrypt.hash("245Sl4y3r#", 10),
        create_at: new Date(),
      },
      {
        email: "pabongamas2@gmail.com",
        password: await bcrypt.hash("245Sl4y3r#", 10),
        create_at: new Date(),
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
  },
};
