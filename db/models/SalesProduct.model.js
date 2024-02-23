const { Model, DataTypes, Sequelize } = require('sequelize');
const TABLE_SALES_PRODUCTS = 'sales_products';
const {SALES_TABLE} = require('./Sales.model');
const {PRODUCT_TABLE} = require('./product.model');


const salesProductSchema={
    saleId:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'sale_id',
        references: { model: SALES_TABLE, key: 'sale_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    productId:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'product_id',
        references: { model: PRODUCT_TABLE, key: 'product_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    itemSale:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'item_sale',
    },
    quantity:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    totalItemQuantity:{
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        field:'total_item_quantity'
    }
};
class SaleProduct extends Model {
    static associate(models) {
        this.belongsTo(models.Sale, { as: 'saleProductSale',foreignKey:'sale_id' });
        this.belongsTo(models.Product, { as: 'saleProductProduct',foreignKey:'id' });
      }
    
      static config(sequelize) {
        return {
          sequelize,
          tableName: TABLE_SALES_PRODUCTS,
          modelName: 'SaleProduct',
          timestamps: false
        }
      }
}
module.exports = { TABLE_SALES_PRODUCTS, salesProductSchema, SaleProduct }
