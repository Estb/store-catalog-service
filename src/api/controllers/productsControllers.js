//Get One Product by ID or SKU
const getOneProduct = (product, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .findByIdorSku(product)
        .then((prod) => {
          if (!prod)
            return resolve({
              status: 404,
              message: "This product no exists",
            });

          return resolve(prod);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//Client View Product By Id or SKU
const viewProduct = (product, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .viewByIdorSku(product)
        .then((prod) => {
          if (!prod)
            return resolve({
              status: 404,
              message: "This product no exists",
            });

          let view = {
            sku: prod[0].sku,
            price: prod[0].price,
            name: prod[0].name,
            color: prod[0].color,
            description: prod[0].description,
            category: prod[0].category,
            specifications: prod[0].specifications,
            weight: prod[0].weight,
            length: prod[0].length,
            width: prod[0].width,
            height: prod[0].height,
            brand: prod[0].brand,
            comments: prod[0].comments,
          };
          return resolve(view);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//Get all Products
const getAllProducts = (skip, limit, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .findAll(skip, limit)
        .then((products) => {
          if (products.length < 1)
            return resolve({
              status: 404,
              message: "There are no products registered",
            });

          return resolve(products);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//create a new Product
const createNewProduct = (product, createdBy, storeId, repository) => {
  return new Promise((resolve, reject) => {
    try {
      checkDuplicity(product.sku, repository)
        .then((cd) => {
          if (cd == true) {
            return resolve({
              status: 409,
              message: "This sku is already registered.",
            });
          } else {
            product.createdBy = createdBy;
            product.storeId = storeId;
            repository()
              .create(product)
              .then((newProduct) => {
                return resolve(newProduct);
              })
              .catch((error) => reject(error));
          }
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//Edit Product by ID or SKU
const editProduct = (id, product, updatedBy, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .findByIdorSku(id)
        .then((prod) => {
          if (!prod)
            return resolve({
              status: 404,
              message: "This product no exists",
            });

          checkDuplicity(product.sku, repository, id)
            .then((cd) => {
              if (cd == true) {
                return resolve({
                  status: 409,
                  message: "This sku is already registered.",
                });
              } else {
                product.lastUpdatedBy = updatedBy;
                product.updated = Date.now()
                repository()
                  .update(id, product)
                  .then((editProduct) => {
                    if (editProduct == null)
                      return resolve({
                        status: 404,
                        message: "This product no exists.",
                      });
                    return resolve(editProduct);
                  })
                  .catch((error) => reject(error));
              }
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//delete Product by ID or SKU
const deleteProduct = (product, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .delete(product)
        .then((del) => {
          return resolve(del);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//Find all intens or by query
const searchItem = async (skip, limit, input, repository) => {
  return new Promise((resolve, reject) => {
    try {
      escapeRegex = (string) => {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      };
      let search = [];
      for (let key in input) {
        if (
          key != null &&
          key != "active" &&
          key != "price" &&
          key != "limit" &&
          key != "skip" &&
          key != "page"
        ) {
          search.push({ [key]: { $regex: escapeRegex(input[key]) } });
        } else if (key != "limit" && key != "skip" && key != "page") {
          search.push({ [key]: input[key] });
        } else {
          search.push({});
        }
      }
      repository()
        .search(search, skip, limit)
        .then((product) => {
          if (!product)
            return resolve({
              status: 404,
              message: "This product no exists",
            });

          return resolve(product);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//check for duplicity function
const checkDuplicity = async (product, repository, id) => {
  if (!product || !repository) return false;
  let cd = await repository().findByIdorSku(product);
  if (cd != null && cd.length > 0) {
    if ((id && id == cd.id) || (id && id == cd.sku)) {
      return false;
    }
    return true;
  }
  return false;
};

//create a new Image
const createNewImage = (id, image, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .insertImage(id, image)
        .then((newImage) => {
          return resolve(newImage);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

//delete Image
const deleteImage = (id, imageId, repository) => {
  return new Promise((resolve, reject) => {
    try {
      repository()
        .deleteImage(id, imageId)
        .then((ok) => {
          return resolve(ok);
        })
        .catch((error) => reject(error));
    } catch (error) {
      if (error) return reject(error);
    }
  });
};

module.exports = {
  createNewProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  searchItem,
  viewProduct,
  createNewImage,
  deleteImage,
};
