'use strict';
const { ROLS_TABLE } = require("./../models/rol.model");
const { DataTypes, Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(ROLS_TABLE, [
      {
        name: "SuperUser",
      },
      {
        name: "Admin",
      },
      {
        name: "Customer",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(ROLS_TABLE, null, {});
  }
};
