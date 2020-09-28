const test = require("jest");
const server = require("./server");
require('dotenv-safe').config();

function apiMock(router, controllers, httpResponseHelper, middleware, daos) {
  console.log("do nothing");
}

describe("Test Server.js", () => {
  it("Server Start", async () => {
    server.start(null, apiMock, (err, server) => {
      expect(err).toBe(false);
      expect(server).toBe(server);
    });
  });

  it("Server Stop", async () => {
    server.stop(null,() => {
      expect(err).toBe(false);
      expect(server).toBe(server);
    });
  });
});