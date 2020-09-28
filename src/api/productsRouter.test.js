const supertest = require("supertest");
const utils = require("../utils/testutils");
const mongoDb = require("../config/mongodb")
require('dotenv-safe').config();

var app = null;
var productId = null;
var productSku = null;
var imageId = null;
beforeAll(async () => {
  app = await utils.testMock().startServer();
});

afterAll(() => {
  utils.testMock().stopServer(mongoDb);
});

describe("Test Products Router", () => {
  it("Should create a new Product", async (done) => {
    const response = await supertest(app)
      .post("/products")
      .send(utils.testMock().create())
      .set("Authorization", "bearer " + utils.testMock().token());
    productId = response.body._id;
    productSku = response.body.sku;
    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should find All Products", async (done) => {
    const response = await supertest(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should find one Product by id", async (done) => {
    const response = await supertest(app).get("/products/" + `${productId}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should find one Product by Sku", async (done) => {
    const response = await supertest(app).get("/products/" + `${productSku}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should search product by params", async (done) => {
    const response = await supertest(app)
      .get("/products")
      .query({ name: "test" });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should Client view product by sku", async (done) => {
    const response = await supertest(app)
      .get("/products/view/" + `${productId}`)
      .query({ name: "test" });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should edit Product", async (done) => {
    const response = await supertest(app)
      .put("/products/" + `${productId}`)
      .send(utils.testMock().edit())
      .set("Authorization", "bearer " + utils.testMock().token());
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done();
  });

  it("Should insert a new image", async (done) => {
    const response = await supertest(app)
      .post("/products/" + `${productId}` + "/images")
      .send(utils.testMock().insetImage())
      .set("Authorization", "bearer " + utils.testMock().token());
      imageId = response.body.images[2]._id;
    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should delete image from product", async (done) => {
    const response = await supertest(app)
      .delete("/products/" + `${productId}` + "/images/" + `${imageId}`)
      .set("Authorization", "bearer " + utils.testMock().token());
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });

  it("Should delete product", async (done) => {
    const response = await supertest(app)
      .delete("/products/" + `${productId}`)
      .set("Authorization", "bearer " + utils.testMock().token());
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    done()
  });
});
