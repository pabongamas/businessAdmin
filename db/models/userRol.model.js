const { Model, DataTypes, Sequelize } = require('sequelize');

const USERS_ROLES_TABLE = 'users_roles';

const UsersRolsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'user_role_id',
    },
    idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
    },
    idRole: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'role_id',
    },
}

class UserRole extends Model {
    static associate(models) {
        // this.hasOne(models.Customer, {as: 'customer',foreignKey:'userId'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_ROLES_TABLE,
            modelName: 'UserRole',
            timestamps: false
        }
    }
}


module.exports = { USERS_ROLES_TABLE, UsersRolsSchema, UserRole }
