const express = require("express");
const passport = require('passport');
const ClientsService = require('./../services/clients.service');
const businessService=require('./../services/business.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {checkAdminRole}=require('./../middlewares/auth.handler');
const {
    createClientSchema
} = require("./../schemas/clients.schema");
const autenticacionJwt= passport.authenticate('jwt', { session: false });
const router = express.Router();
const service = new ClientsService();
const ServiceBusiness=new businessService();


router.get("/business",autenticacionJwt,checkAdminRole, async (req, res, next) => {
  try {
    const user=req.user;
    user.id=user.sub;
    const business=await ServiceBusiness.businessByUser(user);
    const clients = await service.findByBusiness(business);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

module.exports=router;
