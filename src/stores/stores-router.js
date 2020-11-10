const path = require('path');
const express = require("express");
const xss = require('xss');
const StoresService = require("./stores-service");
const logger = require("../logger");


const storesRouter = express.Router();
const jsonParser = express.json();

storesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    StoresService.getByName(knexInstance)
      .then((employees) => {
        res.json(employees);
      })
      .catch(next);
  })

module.exports = storesRouter;

