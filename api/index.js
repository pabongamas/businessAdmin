const express = require("express");
const cors = require("cors");
const routerApi=require('./routes');
const {config}=require('./../config/config')

const {logErrors,errorHandler,boomErrorHandler,ormErrorHandler} =require('./middlewares/error.handler');
const app = express();
const PORT = process.env.PORT || 3977;

app.use(express.json());
app.get("/api",(req, res) =>{
    res.send("Hola mi server en Express");
});
  
app.use(cors());
routerApi(app);
//   app.use(logErrors);
//   app.use(ormErrorHandler);
  app.use(boomErrorHandler);
//   app.use(errorHandler);

app.listen(PORT, () => {
  console.log("My port: " + PORT);
});
