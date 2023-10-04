"use strict";
const { BUSINESS_TABLE } = require("./../models/business.model");
const { DataTypes, Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(BUSINESS_TABLE, [
      {
        name: "Corp avance",
      },
      {
        name: "Box guane",
      },
      {
        name: "Empresa jhon",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(BUSINESS_TABLE, null, {});
  },
};
