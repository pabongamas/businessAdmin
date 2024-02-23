'use strict';
const { salesSchema,SALES_TABLE } = require('./../models/Sales.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(SALES_TABLE,salesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(SALES_TABLE);
  }
};
