const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_BUSINESS_TABLE_ROL = "user_business_role";

const UserBusinessRoleSchema = {
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
  },
  idRole: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "role_id",
  },
  idBusiness: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "business_id",
  },
};

class UserBusinessRole extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_BUSINESS_TABLE_ROL,
      modelName: "UserBusinessRole",
      timestamps: false,
    };
  }
}

module.exports = {
  USER_BUSINESS_TABLE_ROL,
  UserBusinessRoleSchema,
  UserBusinessRole,
};
