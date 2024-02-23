const { Model, DataTypes, Sequelize } = require('sequelize');
const SALES_TABLE = 'sales';

const salesSchema={
    saleId:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'sale_id',
    },
    saleDate:{
        allowNull: false,
        type: DataTypes.DATE,
        field:'sale_date',
    },
    clientId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field:'client_id',
    },
    total:{
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    active:{
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    methodPayId:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field:'methodpay_id',
    },
    paymentDate:{
        allowNull: true,
        type: DataTypes.DATE,
        field:'payment_date',
    },
    totalPay:{
        allowNull: true,
        type: DataTypes.DECIMAL(10, 2),
        field:'total_pay',
    },
    payCompleted:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field:'pay_completed',
    },
    businessId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field:'business_id',
    }
};

class Sale extends Model {
    static associate(models) {
        this.belongsTo(models.Client, { as: 'client',foreignKey:'client_id' });
        this.belongsTo(models.MethodPay, { as: 'methodpay', foreignKey: 'methodpay_id' });
        this.belongsTo(models.Business, { as: 'business', foreignKey: 'business_id' });
      }
    
      static config(sequelize) {
        return {
          sequelize,
          tableName: SALES_TABLE,
          modelName: 'Sale',
          timestamps: false
        }
      }
}
module.exports = { SALES_TABLE, salesSchema, Sale }
