const { Model, DataTypes, Sequelize } = require("sequelize");

const CATEGORIES_TABLE = "categories";

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field:'category_id',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: { type: DataTypes.STRING, allowNull: true },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

class Categories extends Model {
  static associate(models) {
     this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
  
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: "Categories",
      timestamps: false,
    };
  }
}

module.exports = {
    CATEGORIES_TABLE,
    CategoriesSchema,
    Categories
};
