const input = require("../helpers/inputHelper");

const newProduct = (req) => {
  return new Promise(async(resolve, reject) => {
  const { body } = req;
  const value = await input.newProductSchema
    .validateAsync(body)
    .then((input) => {
      return resolve(input);
    })
    .catch((err) => reject(err.message));
  })
};

const editProduct = (req) => {
  return new Promise(async(resolve, reject) => {
  const { body } = req;
  const value = await input.editProductSchema
    .validateAsync(body)
    .then((input) => {
      return resolve(input);
    })
    .catch((err) => reject(err.message));
  })
};

const queryProduct = (req) => {
  return new Promise(async(resolve, reject) => {
  const {query} = req
  const value = await input.querySchema
    .validateAsync(query)
    .then((input) => {
      return resolve(input);
    })
    .catch((err) => reject(err.message));
  })
};

const newImage = (req) => {
  return new Promise(async(resolve, reject) => {
  const { body } = req;
  const value = await input.newImageSchema
    .validateAsync(body)
    .then((input) => {
      return resolve(input);
    })
    .catch((err) => reject(err.message));
  })
};

const editImage = (req) => {
  return new Promise(async(resolve, reject) => {
  const { body } = req;
  const value = await input.editImageSchema
    .validateAsync(body)
    .then((input) => {
      return resolve(input);
    })
    .catch((err) => reject(err.message));
  })
};
module.exports = {newProduct, editProduct, queryProduct, newImage, editImage}
