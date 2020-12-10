// const app = require('../src/app');
const { assert } = require("chai");
const { response } = require("express");
const supertest = require("supertest");
const request = supertest("http://localhost:9000");

describe("GET /api/stores", () => {
  it("should GET all the stores", () => {
    request.get("/api/stores").expect(200, (error) => {
      console.log(error);
    });
  });
});

describe("GET /api/stores/store", () => {
  it("should GET a store by language", () => {
    request.get("/api/stores/store").expect(200, (error) => {
      console.log(error);
    });
  });
});

describe("GET /api/accounts", () => {
  it("should GET all accounts", () => {
    request.get("/api/accounts").expect(200, (error) => {
      console.log(error);
    });
  });
});

describe("POST /api/accounts", () => {
  it("Creates a new account", (done) => {
    request
      .post("/api/accounts")
      .send({
        username: "test",
        password: 1234,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done());
  });
});

describe("Post /api/accounts/account", () => {
  it("Logs in to account", (done) => {
    request
      .post("/api/accounts/account")
      .send({
        username: "test",
        password: 1234,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done());
  });
});

describe("Get /api/accounts/favorite/:accounts_id", () => {
  it("GET all favorites in account", (done) => {
    request
      .get("/api/accounts/favorite/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});

describe("Delete /api/accounts/favorite/:accounts_id", () => {
  it("DELETE a favorite in account", (done) => {
    request
      .delete("/api/accounts/favorite/28")
      .set("Accept", "application/json")
      .expect(204, done());
  });
});

describe("post /api/accounts/favorite", () => {
  it("POST a new favorite in account", (done) => {
    request
      .post("/api/accounts/favorite")
      .send({
        accounts_id: 1,
        store_id: 8,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done());
  });
});
