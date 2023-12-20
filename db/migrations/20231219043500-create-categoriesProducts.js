'use strict';

const { CATEGORIES_TABLE,CategoriesSchema } = require('./../models/categorieProduct.model');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE,CategoriesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  }
};
