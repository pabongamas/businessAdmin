const { User, UserSchema } = require('./user.model');
const {Role,RolsSchema} =require('./rol.model');
const {UserRole,UsersRolsSchema}=require('./userRol.model');
const { Sequelize } = require('sequelize');



function setupModels(sequelize) {
  Role.init(RolsSchema,Role.config(Sequelize))
  User.init(UserSchema, User.config(sequelize));
  UserRole.init(UsersRolsSchema,UserRole.config(sequelize));

  Role.associate(sequelize.models);
  User.associate(sequelize.models);
  UserRole.associate(sequelize.models);

}

module.exports = setupModels;
