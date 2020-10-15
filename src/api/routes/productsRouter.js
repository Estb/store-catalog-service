const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = (app, controllers, httpResponseHelper, middleware, repository) => {
  const rh = httpResponseHelper
  const inputNewHelper = middleware.inputHelper.newProduct;
  const inputEditHelper = middleware.inputHelper.editProduct;
  const inputQueryHelper = middleware.inputHelper.queryProduct;

  const newImage = middleware.inputHelper.newImage;

  //Get one product by product ID or By SKU
  app.get("/products/:product", (req, res, next) => {
    const { product } = req.params;
    controllers
      .getOneProduct(product, repository)
      .then((product) => {
        rh(res).ok(product);
      })
      .catch((err) => {
        if (err) return next(err);
      });
  });

  //Client Get one product by product ID or By SKU
  app.get("/products/view/:product", (req, res, next) => {
    const { product } = req.params;
    controllers
      .viewProduct(product, repository)
      .then((product) => {
        rh(res).ok(product);
      })
      .catch((err) => {
        if (err) return next(err);
      });
  });

  //Get all products or Find products
  app.get("/products/", (req, res, next) => {
    let page = parseInt(req.query.page || "1");
    let skip = parseInt(req.query.skip || "0");
    let limit = parseInt(req.query.limit || "5");
    page < 1 ? (page = 1) : page;
    skip += (page - 1) * limit;

    inputQueryHelper(req)
      .then((input) => {
        if (JSON.stringify(input) !== JSON.stringify({})) {
          controllers
            .searchItem(skip, limit, input, repository)
            .then((product) => {
              rh(res).ok(product);
            })
            .catch((err) => {
              if (err) return next(err);
            });
        } else {
          controllers
            .getAllProducts(skip, limit, repository)
            .then((products) => {
              rh(res).ok(products);
            })
            .catch((err) => {
              if (err) return next(err);
            });
        }
      })
      .catch((err) => {
        if (err) return rh(res).error({ status: 400, message: err });
      });
  });

  //Create a new product
  app.post(
    "/products",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const creatdBy = req.user.userId;
      const storeId = req.user.storeId;
      inputNewHelper(req)
        .then((input) => {
          if (input) {
            controllers
              .createNewProduct(input, creatdBy, storeId, repository)
              .then((product) => {
                if (product) return rh(res).created(product);
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => {
          if (err) return rh(res).error({ status: 400, message: err });
        });
    }
  );

  //edit product by Id or SKU
  app.put(
    "/products/:product",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const updatedBy = req.user.userId;
      const id = req.params.product;
      inputEditHelper(req)
        .then((input) => {
          if (input) {
            controllers
              .editProduct(id, input, updatedBy, repository)
              .then((product) => {
                if (product) return rh(res).ok(product);
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => {
          if (err) return rh(res).error({ status: 400, message: err });
        });
    }
  );

  //delete product by ID or SKU
  app.delete(
    "/products/:product",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const id = req.params.product;
      controllers
        .deleteProduct(id, repository)
        .then((product) => {
          if (product) return rh(res).ok(product);
        })
        .catch((err) => next(err));
    }
  );

  //Insert a new image
  app.post(
    "/products/:productId/images",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const { productId } = req.params;
      newImage(req)
        .then((input) => {
          if (input) {
            controllers
              .createNewImage(productId, input, repository)
              .then((product) => {
                if (product) return rh(res).created(product);
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => {
          if (err) return rh(res).error({ status: 400, message: err });
        });
    }
  );

  //delete image by ID
  app.delete(
    "/products/:product/images/:image",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const id = req.params.product;
      const imageId = req.params.image;
      controllers
        .deleteImage(id, imageId, repository)
        .then((product) => {
          if (product) return rh(res).ok(product);
        })
        .catch((err) => next(err));
    }
  );
};
