const express = require("express");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validatorHandler = require("./../middlewares/validator.handler");
const {loginAuthSchema} = require("./../schemas/auth.schema");


const {config}=require('./../../config/config');
const AuthService=require('./../services/auth.service');
const service=new AuthService();
const router = express.Router();

router.post(
    "/login",
    validatorHandler(loginAuthSchema, "body"),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        const user = req.user;
        res.json(service.signToken(user));
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
