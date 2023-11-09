const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const userId = Joi.number().integer();
const rolId = Joi.number().integer();
const businessId= Joi.number().integer();


const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email
});

const getUserSchema = Joi.object({
  id: id.required(),
});
const findUserSchema = Joi.object({
  email: email.required(),
});
const setRolToUserSchema = Joi.object({
  userId: userId.required(),
  rolId: rolId.required()
});
const setBusinessRolToUserSchema = Joi.object({
  userId: userId.required(),
  rolId: rolId.required(),
  businessId:businessId.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, setRolToUserSchema,setBusinessRolToUserSchema }
