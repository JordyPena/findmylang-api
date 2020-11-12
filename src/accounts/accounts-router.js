const AccountsService = require('./accounts-service')
const express = require('express')
const logger = require('../logger')


const accountsRouter = express.Router()
//this speaks to my body
const jsonParser = express.json()


accountsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AccountsService.getAllAccounts(knexInstance)
      .then((accounts) => {
        res.json(accounts)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const {username, password} = req.body;
    const newAccount = {username, password};
   
    const numberOfValues = Object.values(req.body).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain both 'username' and 'password'`,
        }
      })

    AccountsService.addAccount(req.app.get('db'), newAccount)
      .then((account) => {
        res.status(201).json(account)
      })
      .catch(next);
  })

accountsRouter
  .route("/account")
  .get(jsonParser, (req, res, next) => {
   
    const { username, password } = req.body;
  
    AccountsService.getAccount(req.app.get("db"), username, password)
      .then((account) => {
        if(!account) {
          logger.error(`Account with id ${account_id} not found`);
          return res.status(404).json({
            error: {message: `Account Not Found`},
          })
        }
        
        res.json(account);
      })
    
      .catch(next)
  })

  .delete(jsonParser, (req, res, next) => {
    const { account_id } = req.body
   
    AccountsService.deleteAccount(req.app.get("db"), account_id)
      .then((numberOfAffectedRows) => {
       
        logger.info(`Account with id ${account_id} deleted`)
        res.status(204).end()
      })
      .catch(next)
  })

accountsRouter
  .route("/favorite")
  .post(jsonParser, (req, res, next) => {
    const {accounts_id, store_id} = req.body
    const numberOfValues = Object.values(req.body).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain accounts id and store id`,
        }
      })
      AccountsService.addNewFav(req.app.get('db'), accounts_id, store_id)
        .then((favorite) => {
       
          res.status(201).json(favorite)
          
        })
        .catch(next)
  })

accountsRouter
  .route("/:favorite_id")
  .all((req, res, next) => {
    const {favorite_id} = req.params
 
    AccountsService.getFav(req.app.get('db'), favorite_id)
      .then(favorite => {
        if (!favorite_id) {
          logger.error(`Favorite with id ${favorite_id} not found`)
          return res.status(404).json({
            error: {
              message: `Favorite Not Found`
            }
          })
        }
        res.favorite = favorite
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.favorite)
  })

  .delete(jsonParser, (req, res, next) => {
    const { favorite_id } = req.params
  
    AccountsService.deleteFav(req.app.get('db'), favorite_id)
      .then((numberOfAffectedRows) => {
      
        logger.info(`Favorite with id ${favorite_id} deleted`)
        res.status(204).end()
      })
      .catch(next)
  })

  

  module.exports = accountsRouter;