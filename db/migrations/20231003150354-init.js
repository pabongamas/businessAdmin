'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { ROLS_TABLE } = require('./../models/rol.model');
const { USERS_ROLES_TABLE } = require('./../models/userRol.model');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'user_id',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(ROLS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'role_id',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      }
    });
    await queryInterface.createTable(USERS_ROLES_TABLE, {
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
    });
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USERS_ROLES_TABLE);
    await queryInterface.dropTable(ROLS_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
