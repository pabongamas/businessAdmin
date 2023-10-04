const express=require('express');

const usersRouter=require('./usersRouter');
const rolesRouter=require('./rolsRouters');

function routerApi(app){
  const router=express.Router();
  app.use('/api/v1',router);
  router.use('/users',usersRouter);
  router.use('/roles',rolesRouter);
 
}

module.exports=routerApi;
