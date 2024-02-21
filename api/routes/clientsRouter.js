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
      //creo nuevo objeto con los datos a modificar de clientes
      const changes={names:body.names,lastnames:body.lastnames,nickname:body.nickname,phone:body.phone,
        birthdate:body.birthdate,address:body.address,active:body.active,gender:body.gender}
      const client = await service.updateClient(id, changes);

      //por si se edito el email actualizarlo en users
      const user=body.user;
      const userData={email:body.email}
      const userEdit=serviceUser.update(user.id,userData);
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete/:id',
  validatorHandler(getClientSchema, 'params'),
  autenticacionJwt,checkAdminRole,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const{userId}=await service.delete(id);

       //desasigno relacion de usuario como rol de cliente(customer)
       const userRoldata = {
        userId: userId, rolId: 3
      }
      await serviceUser.unSetRol(userRoldata);

      //desagigno relacion de  buser_business_role

      
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
