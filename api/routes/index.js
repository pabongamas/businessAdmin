const express = require('express');

const usersRouter = require('./usersRouter');
const rolesRouter = require('./rolsRouters');
const businessRouter = require("./businessRouter");
const categoriesRouter = require("./categoriesRouter");

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/roles', rolesRouter);
  router.use("/business", businessRouter);
  router.use("/categories", categoriesRouter);
}

module.exports = routerApi;
