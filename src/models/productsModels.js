const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  active: { type: Boolean, required: true, default: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number },
  storeId: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String },
  description: { type: String },
  category: { type: String },
  specifications: { type: String },
  weight: { type: Number },
  length: { type: Number },
  width: { type: Number },
  altura: { type: Number },
  brand: { type: String },
  images: [
    {
      name: String,
      url: String,
    },
  ],
  comments: { type: String },
  created: { type: Date, default: Date.now, required: true },
  createdBy: { type: String, required: true },
  updated: { type: Date },
  lastUpdatedBy: { type: String }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
