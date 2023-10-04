"use strict";

const {
  BUSINESS_TABLE,
  BusinessSchema,
} = require("./../models/business.model");
const {
  USER_BUSINESS_TABLE_ROL,
} = require("./../models/UserBusinessRol.model");
const { USER_TABLE } = require("./../models/user.model");
const { ROLS_TABLE } = require("./../models/rol.model");
const { DataTypes, Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(BUSINESS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "business_id",
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    });
    await queryInterface.createTable(USER_BUSINESS_TABLE_ROL, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "user_business_rol_id",
      },
      idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "user_id",
        references: {
          model: USER_TABLE,
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      idRole: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "role_id",
        references: {
          model: ROLS_TABLE,
          key: "role_id",
        },
        onDelete: "CASCADE",
      },
      idBusiness: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "business_id",
        references: {
          model: BUSINESS_TABLE,
          key: "business_id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_BUSINESS_TABLE_ROL);
    await queryInterface.dropTable(BUSINESS_TABLE);

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
