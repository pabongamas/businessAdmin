const express = require("express");
const passport = require('passport');
const ClientsService = require('./../services/clients.service');
const businessService = require('./../services/business.service');
const userService = require('./../services/users.service');

const validatorHandler = require('./../middlewares/validator.handler');
const { checkAdminRole } = require('./../middlewares/auth.handler');
const {
  createClientSchema,getClientSchema,updateClientSchema
} = require("./../schemas/clients.schema");
const autenticacionJwt = passport.authenticate('jwt', { session: false });
const router = express.Router();
const service = new ClientsService();
const ServiceBusiness = new businessService();
const serviceUser = new userService();


router.get("/business", autenticacionJwt, checkAdminRole, async (req, res, next) => {
  try {
    const user = req.user;
    user.id = user.sub;
    const business = await ServiceBusiness.businessByUser(user);
    const clients = await service.findByBusiness(business);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});
router.get("/business/searchClient", autenticacionJwt, checkAdminRole, async (req, res, next) => {
  try {
    const { search } = req.query;
    const user = req.user;
    user.id = user.sub;
    const business = await ServiceBusiness.businessByUser(user);
    const clients = await service.search(search, business);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.post('/save', autenticacionJwt, checkAdminRole,
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      user.id = user.sub;
      //obtengo los business del usuario que inicio sesion
      const business = await ServiceBusiness.businessByUser(user);
      //seteo los datos para crear el usuario
      const obj = { email: body.email, password: 'secret' }
      //creo el usuario y obtengo los datos de usuario para insertar el user :id al que pertenece el nuevo cliente
      const userCreated = await serviceUser.create(obj);

      //asigno relacion de usuario como rol de cliente(customer)
      const userRoldata = {
        userId: userCreated.id, rolId: 3
      }
      const rolUser = await serviceUser.setRol(userRoldata);

      //asigno relacion indicando a que negocio pertenece el cliente
      const businessRoleUserData = {
        businessId:business[0].id,
        userId:userCreated.id,
        rolId:3
      }
      const userBusinessRole = await serviceUser.setBusinessRolToUser(businessRoleUserData);

      //create client
      const newClient = await service.createClient(body, userCreated.id, business);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/update/:id', autenticacionJwt, checkAdminRole,
  validatorHandler(getClientSchema, 'params'),
  validatorHandler(updateClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log(body)
      // const user = await service.update(id, body);
      res.json("hola");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
