'use strict';
const { salesProductSchema,TABLE_SALES_PRODUCTS } = require('./../models/SalesProduct.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_SALES_PRODUCTS,salesProductSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_SALES_PRODUCTS);
  }
};
