const path = require("path");
const express = require("express");
const StoresService = require("./stores-service");


const storesRouter = express.Router();
const jsonParser = express.json();

//gets all stores
storesRouter
  .route("/")

  .get(jsonParser, (req, res, next) => {
    StoresService.getAll(req.app.get("db"))
      .then((stores) => {
        res.status(200).json(stores);
      })
      .catch(next);
  });

//gets stores by language
storesRouter
  .route("/store")
  .all((req, res, next) => {
    const { language } = req.query;

    StoresService.getByLanguage(req.app.get("db"), language)
      .then((store) => {
        if (!store) {
       
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
    res.status(200).json(res.store);
  });

module.exports = storesRouter;
