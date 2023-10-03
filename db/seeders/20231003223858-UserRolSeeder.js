'use strict';
const { USERS_ROLES_TABLE } = require("./../models/userRol.model");
const { DataTypes, Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert(USERS_ROLES_TABLE, [
    //   {
    //     user_id: 1,
    //     role_id:1,
    //   },
    //   {
    //     user_id: 2,
    //     role_id:2,
    //   },
    //   {
    //     user_id: 3,
    //     role_id:3,
    //   },
    // ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(USERS_ROLES_TABLE, null, {});
  }
};
