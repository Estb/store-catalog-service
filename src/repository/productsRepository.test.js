require('dotenv-safe').config();
const repository = require("./productsRepository");
const mongodb = require("../config/mongodb");
const apiMock = require("../utils/testutils").testMock()

var productId;
var imageId;

beforeAll(async () => {
  await mongodb.connect(async (err, db) => {
    if (err) return false;
    let item = await repository().create(apiMock.create(true));
    productId =  item._id
  });
});

afterAll(async () => {
  await mongodb.disconnect();
});

describe("Test Repository", () => {
  it("Search for a item", async (done) => {
    let item = await repository().search({ active: "true" }, 1, 1);
    expect(item[0]).toHaveProperty("_id");
    done()
  });

  it("Find by findByIdorSku", async (done) => {
    let item = await repository().findByIdorSku(productId);
    expect(item).toHaveProperty("_id");
    done()
  });

  it("View item by viewByIdorSku", async (done) => {
    let item = await repository().viewByIdorSku(productId);
    expect(item[0]).toHaveProperty("name");
    done()
  });

  it("Find All Itens", async (done) => {
    let item = await repository().findAll();
    expect(item[0]).toHaveProperty("name");
    done()
  });
  
  it("Create a new Item", async (done) => {
    let item = await repository().create(apiMock.create(true));
    expect(item).toMatchObject({name:apiMock.create().name})
    done()
  });

  it("Edit a Item", async (done) => {
    let item = await repository().update(
      productId,
      apiMock.edit(true)
    );
    expect(item).toMatchObject({ status: 200 });
    done()
  });

  it("Insert a new Imagem to product", async (done) => {
    let item = await repository().insertImage(productId, apiMock.insetImage());
    imageId = item.images[0]._id
    expect(item).toHaveProperty("name");
    done()
  });

  it("Delete Imagem from product", async (done) => {
    let item = await repository().deleteImage(productId, imageId );
    expect(item).toMatchObject({ status: 200 });
    done()
  });

  it("Delete a Item", async (done) => {
    let item = await repository().delete(productId);
    expect(item).toMatchObject({status:200})
    done()
  });
});
