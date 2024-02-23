const { Model, DataTypes, Sequelize } = require('sequelize');
const TABLE_METHOD_PAY = 'methodpay';

const methodPaySchema={
    methodPayId:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'methodpay_id',
    },
    method:{
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    active:{
        allowNull:false,
        type:DataTypes.BOOLEAN
    }
};

class MethodPay extends Model {
    static associate(models) {
      }
    
      static config(sequelize) {
        return {
          sequelize,
          tableName: TABLE_METHOD_PAY,
          modelName: 'MethodPay',
          timestamps: false
        }
      }
}
module.exports = { TABLE_METHOD_PAY, methodPaySchema, MethodPay }
