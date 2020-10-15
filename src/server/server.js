const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
var server = null;

function start(
  mongodb,
  router,
  controllers,
  httpResponseHelper,
  middleware,
  repository,
  callback
) {
  if (mongodb !== null) {
    mongodb.connect((err, db) => {
      if (err) return next(err);
    });
  }
  const app = express();
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((err, req, res, next) => {
    callback(new Error("Something went wrong!, err:" + err), null);
    res.status(500).send("Something went wrong!");
  });

  router(app, controllers, httpResponseHelper, repository);

  // callback(true)
  server = app.listen(parseInt(process.env.PORT), () => callback(null, server));
}

function stop(mongodb) {
  if (server) {
    if (mongodb !== null) {
      mongodb.disconnect();
    }
    server.close();
    return true;
  }
}

module.exports = { start, stop };
