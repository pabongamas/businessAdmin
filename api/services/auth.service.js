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
      signToken(user) {
        const payload = {
          sub: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        return {
          user,
          token,
        };
      }

}

module.exports = AuthService;