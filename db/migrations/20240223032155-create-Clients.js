'use strict';

const { CLIENT_TABLE,ClientsSchema } = require('./../models/clients.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CLIENT_TABLE,ClientsSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CLIENT_TABLE);
  }
};
