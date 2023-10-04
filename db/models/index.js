const { User, UserSchema } = require('./user.model');
const {Role,RolsSchema} =require('./rol.model');
const {UserRole,UsersRolsSchema}=require('./userRol.model');
const { Business, BusinessSchema } = require("./business.model");
const {
  UserBusinessRole,
  UserBusinessRoleSchema,
} = require("./UserBusinessRol.model");
const { Sequelize } = require("sequelize");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RolsSchema, Role.config(sequelize));
  UserRole.init(UsersRolsSchema, UserRole.config(sequelize));
  Business.init(BusinessSchema, Business.config(sequelize));
  UserBusinessRole.init(
    UserBusinessRoleSchema,
    UserBusinessRole.config(sequelize)
  );

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  UserRole.associate(sequelize.models);
  Business.associate(sequelize.models);
  UserBusinessRole.associate(sequelize.models);
}

module.exports = setupModels;
