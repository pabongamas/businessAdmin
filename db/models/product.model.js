const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIES_TABLE } = require('./categorieProduct.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field:'id',
  },
  business_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: CATEGORIES_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
    
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Categories, { as: 'category' });
    this.hasMany(modeles.Business,{as :'productBusiness'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}


module.exports = { PRODUCT_TABLE, ProductSchema, Product }
