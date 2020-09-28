const Model = require("./productsModels");
const mongoose = require("mongoose");
const mongodb = require("../config/mongodb");
const utils = require("../utils/testutils")
require('dotenv-safe').config();

beforeAll(async () => {
  await mongodb.connect(async (err, db) => {
    if (err) return false;
  });
});

afterAll(() => {
  mongodb.disconnect();
});

describe("Test Products Models", () => {
  it("Should create & save product successfully", async (done) => {
    const data = utils.testMock().create(true)
    const validProduct = new Model(data);
    const savedProduct = await validProduct.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(data.name);
    expect(savedProduct.sku).toBe(data.sku);
    done()
  });

  // Test Validation is working!!!
  it("Should create Product without required field should failed", async (done) => {
    const product = new Model({});
    let err;
    try {
      const savedProductWithoutRequiredField = await product.save();
      error = savedProductWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    done()
  });
});
