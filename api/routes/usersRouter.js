const express = require("express");
const UsersService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
  findUserSchema,
  setRolToUserSchema,
  setBusinessRolToUserSchema
} = require("./../schemas/user.schema");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/searchUser", async (req, res, next) => {
  try {
    const { search } = req.query;
    const users = await service.search(search);
    res.json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);
router.post('/setRol',
  validatorHandler(setRolToUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.setRol(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/unsetRol',
  validatorHandler(setRolToUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      const rta = await service.unSetRol(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/setBusiness',
  validatorHandler(setBusinessRolToUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.setBusinessRolToUser(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports=router;
