'use strict';

const { TABLE_METHOD_PAY,methodPaySchema } = require('./../models/MethodPay.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_METHOD_PAY,methodPaySchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_METHOD_PAY);
  }
};
