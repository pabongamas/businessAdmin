const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLS_TABLE = 'roles';

const RolsSchema = {
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
  },
}

class Role extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
        through:models.UserRole, // Nombre de la tabla intermedia
        foreignKey: 'role_id', // Nombre de la clave foránea en UsuarioRoles que hace referencia a Rol
        as:'users'
      });

      // this.belongsToMany(models.Business, {
      //   through: models.UserBusinessRole, // Nombre de la tabla intermedia
      //   foreignKey: "role_id", // Nombre de la clave foránea en UsuarioRoles que hace referencia a Rol
      //   as: "businessRol",
      // });
      // this.belongsToMany(models.User, {
      //   through: models.UserBusinessRole,
      //   foreignKey: 'role_id',
      // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLS_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}


module.exports = { ROLS_TABLE, RolsSchema, Role }
