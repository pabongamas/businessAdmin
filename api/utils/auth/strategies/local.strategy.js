const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service.js');
const userService = require('../../../services/users.service.js');

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new AuthService();
const ServiceUser=new userService()

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;