const boom=require('@hapi/boom');
const {config}=require('./../../config/config')


function checkApiKey(req,res,next){
    const apikey=req.headers['api'];
    if(apikey===config.apiKey){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
  function checkAdminRole(req,res,next){
    const user=req.user;
    const rols=user.rols;
    if(rols.includes(2)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
  module.exports={checkApiKey,checkAdminRole}