const { User, UserSchema } = require('./user.model');
const {Role,RolsSchema} =require('./rol.model');
const {UserRole,UsersRolsSchema}=require('./userRol.model');
const { Sequelize } = require('sequelize');



function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RolsSchema, Role.config(sequelize));
  UserRole.init(UsersRolsSchema,UserRole.config(sequelize));

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  UserRole.associate(sequelize.models);

}

module.exports = setupModels;
