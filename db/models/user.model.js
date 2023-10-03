const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
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
  // recoveryToken: {
  //   field:'recovery_token',
  //   allowNull: true,
  //   type: DataTypes.STRING
  // },
  // role:{
  //   allowNull:false,
  //   type:DataTypes.INTEGER,
  //   field:'recovery_token',
  // },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'user_id',
      // otherKey: 'role_id'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User }
