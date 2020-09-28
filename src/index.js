require('dotenv-safe').config();
const router = require("./api/routes/productsRouter"); 
const server = require("./server/server"); 
const controllers = require("./api/controllers/productsControllers");
const httpResponseHelper = require("./helpers/httpResponseHelper")
const repository = require("./repository/productsRepository");
const middleware = require("./middleware");
const auth = require("./middleware").auth
const mongoDb = require("./config/mongodb");

server.start(mongoDb, router, controllers, httpResponseHelper, middleware, repository,(err, app) => {
  if(err) return console.log(err)
  
console.log("just started"); 
});
