const express = require("express");
const RolsService = require('./../services/roles.service');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router=express.Router();
const service=new RolsService();

router.get('/', async (req, res, next) => {
  try {
    const roles = await service.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});


module.exports=router;
