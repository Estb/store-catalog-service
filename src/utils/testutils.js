const server = require("../server/server");
const repository = require("../repository/productsRepository");
const mongodb = require("./../config/mongodb");
const httpResponseHelper = require('../helpers/httpResponseHelper')
const middleware = require('../middleware');
const productsRouter = require("../api/routes/productsRouter");
const productsControllers = require('../api//controllers/productsControllers');


const makeSku = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result;
}

const testMock = () => {
  return {
    create: (test) => {
       let dados = {
        active: "true",
        sku: makeSku(12),
        price: "10.00",
        name: "product test",
        color: "white",
        description: "this is a test product",
        category: "test",
        specifications: "test product",
        weight: "5.22",
        length: "10.1",
        width: "9",
        height: "5",
        brand: "test",
        comments: "comement test",
        images: [
          {
            name: "Name test",
            url: "http://teste.com.br",
          },
          {
            name: "Name test",
            url: "http://teste.com.br",
          },
        ],
      }
      if(test){
      dados.createdBy = "test",
      dados.storeId = "test"
      }
      return dados
    },
    edit: (test) => {
      let dados2 = {
        active: "false",
        price: "11.00",
        name: "product test2",
        color: "Black",
        description: "this is a test product",
        category: "test",
        specifications: "test product",
        weight: "5.22",
        length: "10.1",
        width: "9",
        height: "5",
        brand: "test",
        comments: "comement test",
        images: [
          {
            name: "Name test",
            url: "http://teste.com.br",
          },
          {
            name: "Name test",
            url: "http://teste.com.br",
          },
        ],
      }
        return dados2;
    },
    insetImage: () => {
      return (dados3 = {
        name: "Name test2",
        url: "http://teste2.com.br",
      });
    },
    startServer: () =>{
      return new Promise(async (resolve, reject) => {
      server.start(mongodb, productsRouter, productsControllers, httpResponseHelper, middleware, repository,(err, server)=>{
        if(err) return reject(err)
        if(server) return resolve (server)
        })
      })
    },
    stopServer: (mongoDb) =>{
      return new Promise(async (resolve, reject) => {
      server.stop(mongoDb,(ok)=>{
        resolve(ok)
      })
      })
    },
    token: () =>{
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTExMTExMTExMTExIiwic3RvcmVJZCI6IjIyMjIyMjIyMjIyMjIiLCJpYXQiOjE2MDEzMDUzMTR9.R7HxW4tEzZgEvXnyFwIh6DfCZl-Y_DpfkZIwY0OYz68"
    }
  };
};

module.exports = {makeSku, testMock}