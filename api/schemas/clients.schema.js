const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const names=Joi.string();
const lastnames=Joi.string();
const nickname=Joi.string();
const phone=Joi.number();
const gender=Joi.boolean();
const birthdate=Joi.string();
const address=Joi.string();
const active=Joi.boolean();
const user= Joi.object();
const business = Joi.object()


const createClientSchema = Joi.object({
  email: email.required(),
  names: names.required(),
  lastnames: lastnames.required(),
  nickname: nickname,
  phone: phone,
  gender: gender.required(),
  birthdate:birthdate.required(),
  address:address,
  active:active
});

const updateClientSchema=Joi.object({
  email: email.required(),
  names: names.required(),
  lastnames: lastnames.required(),
  nickname: nickname,
  phone: phone,
  gender: gender.required(),
  birthdate:birthdate.required(),
  address:address,
  active:active,
  user:user,
  business:business
});
const getClientSchema = Joi.object({
  id: id.required(),
});


module.exports = { createClientSchema,getClientSchema,updateClientSchema }
