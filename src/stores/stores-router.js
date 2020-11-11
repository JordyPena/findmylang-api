const path = require("path");
const express = require("express");
const xss = require("xss");
const StoresService = require("./stores-service");
const logger = require("../logger");

const storesRouter = express.Router();
const jsonParser = express.json();

storesRouter
  .route("/")

  .get((req, res, next) => {
    StoresService.getAll(req.app.get("db"))
      .then((stores) => {
        res.json(stores);
      })
      .catch(next);
  });

storesRouter
  .route("/:language")
  .all((req, res, next) => {
    const { language } = req.params;
    console.log("this is language from req.params", language)
   
    StoresService.getByLanguage(req.app.get("db"), language)
      .then((store) => {
       console.log("store language is", store)
        if (!store) {
          logger.error(`Store with language ${language} not found.`);
          return res.status(404).json({
            error: { message: `Store Not Found` },
          });
        }

        res.store = store;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    res.json(res.store);
  });

module.exports = storesRouter;
