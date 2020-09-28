const model = require("../models/productsModels");
const logger = require("../helpers/loggerHelp");
const mongoose = require("mongoose");

module.exports = () => {
  return {
    search: async (search, skip, limit) => {
      return new Promise((resolve, reject) => {
        model
          .find()
          .and(search)
          .skip(skip)
          .limit(limit)
          .then((ok) => {
            if(ok.length>0){
              logger.info("[ProductDAO] Search done successfully");
              return resolve(ok);
              } else {
                logger.info(
                  "[ProductDAO] No products were found with the parameters informed"
                );
                return resolve({
                  status: 404,
                  message: "No products were found with the parameters informed",
                });
              }
          })
          .catch((err) => {
            logger.error(
              "[ProductDAO] An error has occurred while find this product",
              err
            );
            return reject(err);
          });
      });
    },
    findByIdorSku: async (product) => {
      return new Promise(async (resolve, reject) => {
        let item = model
          .findOne({ sku: product })
          .then((s) => {
            if (s == null) {
              if (mongoose.Types.ObjectId.isValid(product)) {
                item = model.findOne({ _id: product });
                logger.info("[ProductsDAO] Search done successfully by Id");
                resolve(item);
              } else {
                logger.info(
                  "[ProductsDAO] Not Found this product"
                );
                return resolve(false);
              }
            } else {
              logger.info("[ProductsDAO] Search done successfully by sku");
              return resolve(s);
            }
          })
          .catch((err) => {
            logger.error(
              "[ProductDAO] An error has occurred while find this product",
              err
            );
            return reject(err);
          });
      });
    },
    viewByIdorSku: async (product) => {
      return new Promise(async (resolve, reject) => {
        let item = model
          .find({ sku: product })
          .and({ active: "true" })
          .then((s) => {
            if (JSON.stringify(s) === JSON.stringify([])) {
              if (mongoose.Types.ObjectId.isValid(product)) {
                item = model.find({ _id: product }).and({ active: "true" });
                logger.info("[ProductsDAO] Search done successfully by Id");
                resolve(item);
              } else {
                logger.info(
                  "[ProductsDAO] Not found this product"
                );
                return resolve(false);
              }
            } else {
              logger.info("[ProductsDAO] Search done successfully by sku");
              return resolve(s);
            }
          })
          .catch((err) => {
            logger.error(
              "[ProductDAO] An error has occurred while find this product",
              err
            );
            return reject(err);
          });
      });
    },
    findAll: async (skip, limit) => {
      return new Promise((resolve, reject) => {
        model
          .find()
          .skip(skip)
          .limit(limit)
          .then((ok) => {
          if(ok.length>0){
            logger.info("[ProductDAO] Search done successfully");
            return resolve(ok);
            } else {
              logger.info(
                "[ProductDAO] No products found"
              );
              return resolve({
                status: 404,
                message: "No products found",
              });
            }
          })
          .catch((err) => {
            logger.error(
              "[ProductDAO] An error has occurred while find this product",
              err
            );
            return reject(err);
          });
      });
    },
    create: (product) => {
      return new Promise((resolve, reject) => {
        logger.info(
          "[ProductsDAO] Creating a new product",
          JSON.stringify(product)
        );
        model
          .create(product)
          .then((prod) => {
            logger.info(
              "[ProductsDAO] The product has been created succesfully",
              JSON.stringify(prod)
            );
            return prod;
          })
          .then(resolve)
          .catch((err) => {
            logger.error(
              "[ProductsDAO] An error has ocurred while saving",
              err
            );
            return reject({
              status: 422,
              message: err,
            });
          });
      });
    },
    update: (id, product) => {
      return new Promise((resolve, reject) => {
        logger.info("[ProductsDAO] Update an item");
        let item = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          item = model
            .updateOne({ _id: id }, product, {
              multi: false,
              new: true,
            })
            .then((item) => {
              logger.info(
                "[ProductsDAO] The product has been updated succesfully"
              );
              resolve({
                status: 200,
                message: "The product has been updated succesfully",
              });
            })
            .catch((err) => {
              logger.error(
                "[ProductsDAO] An error has ocurred while updating the product",
                err
              );
              return reject({
                status: 422,
                message: err,
              });
            });
        } else {
          resolve({
            status: 400,
            message: "You need to pass a correct product id",
          });
        }
      });
    },
    delete: (id) => {
      return new Promise((resolve, reject) => {
        if (mongoose.Types.ObjectId.isValid(id)) {
          model
            .findByIdAndRemove(id)
            .then((res) => {
              if (res) {
                logger.info(
                  "[ProductDAO] The items have been deleted succesfully"
                );
                return resolve({
                  status: 200,
                  message: "The product has been deleted succesfully",
                });
              } else {
                logger.info(
                  "[ProductDAO] Not found this item"
                );
                return resolve({
                  status: 404,
                  message: "This product no exists",
                });
              }
            })
            .catch((err) => {
              logger.error(
                "[ProductDAO] An error has occurred while deleting the item",
                err
              );
              return reject({
                status: 422,
                message: err,
              });
            });
        } else {
          return resolve({
            status: 400,
            message: "You need to pass a correct product id",
          });
        }
      });
    },
    insertImage: (idOrSku, image) => {
      return new Promise((resolve, reject) => {
        logger.info("[ProductsDAO] Insert Image");
        let item = null;
        item = model
          .findOneAndUpdate(
            { sku: idOrSku },
            {
              $push: {
                images: image,
              },
            },
            { multi: false, new: true }
          )
          .then((s) => {
            if (s == null) {
              if (mongoose.Types.ObjectId.isValid(idOrSku)) {
                item = model.findOneAndUpdate(
                  { _id: idOrSku },
                  {
                    $push: {
                      images: image,
                    },
                  },
                  { multi: false, new: true }
                );
                logger.info(
                  "[ProductsDAO] The image has been updated succesfully by ID"
                );
                resolve(item);
              } else {
                logger.info(
                  "[ProductsDAO] Not found"
                );
                return resolve({
                  status: 404,
                  message: "This product no exists",
                });
              }
            } else {
              logger.info(
                "[ProductsDAO] The image has been updated succesfully by SKU"
              );
              resolve(s);
            }
          });
      });
    },
    deleteImage: (productId, imageId) => {
      return new Promise((resolve, reject) => {
        logger.info("[ProductsDAO] Delete image");
        if (
          mongoose.Types.ObjectId.isValid(productId) &&
          mongoose.Types.ObjectId.isValid(imageId)
        ) {
          model.findOneAndUpdate(
              { _id: productId, "images._id": imageId },
              {
                $pull: {
                  images: { _id: imageId },
                },
              }
            )
            .then((remove) => {
              if (remove) {
                logger.info(
                  "[ProductDAO] The image have been deleted successfully"
                );
                resolve({
                  status: 200,
                  message: "The image has been deleted successfully",
                });
              } else {
                logger.info(
                  "[ProductsDAO] Not found"
                );
                resolve({
                  status: 404,
                  message: "This product or image no exists",
                });
              }
            })
            .catch((err) => {
              logger.error(
                "[ProductDAO] An error has occurred while deleting this image",
                err
              );
              reject({
                status: 422,
                message: err,
              });
            });
        } else {
          resolve({
            status: 400,
            message: "You need to pass a correct product and image id",
          });
        }
      });
    },
  };
};
