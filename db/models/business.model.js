const { Model, DataTypes, Sequelize } = require("sequelize");

const BUSINESS_TABLE = "business";

const BusinessSchema = {
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
};

class Business extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserBusinessRole, // Nombre de la tabla intermedia
      foreignKey: "user_id", // Nombre de la clave foránea en UsuarioRoles que hace referencia a Rol
      as: "usersBusiness",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUSINESS_TABLE,
      modelName: "Business",
      timestamps: false,
    };
  }
}

module.exports = { BUSINESS_TABLE, BusinessSchema, Business };
