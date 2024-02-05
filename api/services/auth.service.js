const UsersService = require('./users.service');
const service = new UsersService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../../config/config');

const { models } = require('../libs/sequelize');

class AuthService {
    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
          throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw boom.unauthorized();
        }
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
      }
      async signToken(user) {
        const roleBusinessByUser=await service.searchRoleAndBusinessByUser(user);
        const dataUser=roleBusinessByUser[0].dataValues;
        var rolesId=[];
        dataUser.roles.forEach(element => {
          rolesId.push(element.dataValues.id);
        });
        const payload = {
          sub: user.id,
          email: user.email,
          rols:rolesId
        };
        const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' }); // Define una expiración para el Access Token
        const refreshToken = jwt.sign({}, config.jwtSecret, { expiresIn: '7d' }); // Define una expiración para el Refresh Token
        var id =user.id;

        const userData = await service.findOne(id);
        const changes={refreshToken:refreshToken};
        await userData.update(changes);
        return {
          user,
          accessToken,
          refreshToken,
        };
      }

}

module.exports = AuthService;