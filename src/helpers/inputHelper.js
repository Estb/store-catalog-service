const Joi = require("@hapi/joi");

const newProductSchema = Joi.object({
  active: Joi.boolean(),
  sku: Joi.string().required(),
  price: Joi.number(),
  name: Joi.string().min(3).max(60).required(),
  color: Joi.string().min(3).max(60),
  description: Joi.string().min(3).max(60),
  category: Joi.string().min(3).max(60).required(),
  specifications: Joi.string().min(3).max(60),
  weight: Joi.number(),
  length: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  brand: Joi.string(),
  comments: Joi.string(),
  images:Joi.array()
});


const editProductSchema = Joi.object({
  active: Joi.boolean(),
  sku: Joi.string(),
  price: Joi.number(),
  name: Joi.string().min(3).max(60),
  color: Joi.string().min(3).max(60),
  description: Joi.string().min(3).max(60),
  category: Joi.string().min(3).max(60),
  specifications: Joi.string().min(3).max(60),
  weight: Joi.number(),
  length: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  brand: Joi.string(),
  comments: Joi.string(),
  images:Joi.array()
}).min(1);


const querySchema = Joi.object({
  active: Joi.boolean(),
  sku: Joi.string(),
  price: Joi.number(),
  name: Joi.string(),
  color: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  specifications: Joi.string(),
  weight: Joi.number(),
  length: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  brand: Joi.string(),
  comments: Joi.string(),
  page: Joi.number(),
  limit: Joi.number(),
  skip: Joi.number()
})

const newImageSchema = Joi.object({
  name:Joi.string().required(),
  url:Joi.string().required()
})

const editImageSchema = Joi.object({
  name:Joi.string().required(),
  url:Joi.string().required()
}).min(1)


module.exports = { newProductSchema, editProductSchema, querySchema, newImageSchema, editImageSchema};
