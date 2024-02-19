const { Model, DataTypes, Sequelize } = require('sequelize');
const { BUSINESS_TABLE } = require('./business.model');
const { USER_TABLE } = require('./user.model');
const CLIENT_TABLE = 'clients';

const ClientsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field:'client_id',
  },
  names: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastnames: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nickname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  gender: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  birthdate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  business_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: BUSINESS_TABLE, key: 'business_id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: USER_TABLE, key: 'user_id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

class Client extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user',foreignKey: 'user_id'});
    this.belongsTo(models.Business, { as: 'business', foreignKey: 'business_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}


module.exports = { CLIENT_TABLE, ClientsSchema, Client }
