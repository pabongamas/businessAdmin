'use strict';

const { CATEGORIES_TABLE } = require('./../models/categorieProduct.model');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'id',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  }
};
