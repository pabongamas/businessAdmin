const express = require("express");
const passport = require('passport');
const CategorieService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {checkAdminRole}=require('./../middlewares/auth.handler');

const {
   createCategorieSchema,getCategorieSchema,updateCategorieSchema
  } = require("./../schemas/categorie.schema");

const router = express.Router();
const service = new CategorieService();
const autenticacionJwt= passport.authenticate('jwt', { session: false });

router.get("/",autenticacionJwt,checkAdminRole, async (req, res, next) => {
    try {
        const categories = await service.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});
router.get("/user",autenticacionJwt,checkAdminRole, async (req, res, next) => {
  try {
    const user=req.user;
    user.id=user.sub;
      const categories = await service.categoriessByBusiness(user);
      res.json(categories);
  } catch (error) {
      next(error);
  }
});

router.get("/searchCategorie",autenticacionJwt,checkAdminRole, async (req, res, next) => {
    try {
        const { search } = req.query;
        const categories = await service.search(search);
        res.json(categories);
    } catch (error) {
        next(error);
    }
});
router.get("/byBusiness",autenticacionJwt,checkAdminRole, async (req, res, next) => {
  try {
    const user=req.user;
    user.id=user.sub;
    const business = await service.categoriessByBusiness(user);
    res.json(business);
  } catch (error) {
    next(error);
  }
});
router.post('/',
  validatorHandler(createCategorieSchema, 'body'),
  autenticacionJwt,checkAdminRole,
  async (req, res, next) => {
    try {
      const body = req.body;
      const user=req.user;
      const newCategorie = await service.create(body,user);
      res.status(201).json(newCategorie);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:category_id',
  validatorHandler(getCategorieSchema, 'params'),
  validatorHandler(updateCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { category_id } = req.params;
      const body = req.body;
      const user = await service.update(category_id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:category_id',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { category_id } = req.params;
      await service.delete(category_id);
      res.status(201).json({category_id});
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
