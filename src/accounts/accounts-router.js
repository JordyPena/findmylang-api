const AccountsService = require('./accounts-service')
const express = require('express')
const logger = require('../logger')
const { ConsoleTransportOptions } = require('winston/lib/winston/transports')


const accountsRouter = express.Router()
//this speaks to my body
const jsonParser = express.json()

//get all accounts
accountsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AccountsService.getAllAccounts(knexInstance)
      .then((accounts) => {
        res
          .status(200)
          .json(accounts)
      })
      .catch(next)
  })
  //create a new account
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
      console.log("about to add account")
    AccountsService.addAccount(req.app.get('db'), newAccount)
      .then((account) => {
        console.log("this is account", account)
        if (!account) {
          return res.status(401).json({
            error: {
              message: `User already exist, try signing in`
            }
          })
        }
        res
          .status(201)
          .json(account)
      })
      .catch(next);
  })

  //sign into account if exists
accountsRouter
  .route("/account")
  .post(jsonParser, (req, res, next) => {
   
    const { username, password } = req.body;
  
    AccountsService.getAccount(req.app.get("db"), username, password)
      .then((account) => {
        if(!account) {
          logger.error(`Account with id ${account_id} not found`);
          return res.status(404).json({
            error: {message: `Account Not Found`},
          })
        }
        
        res
          .status(201)
          .json(account);
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


//get all favorites in current account
//delete favorite selected in current account
accountsRouter
  .route("/favorite/:accounts_id")
  .all((req, res, next) => {
    
    const {accounts_id} = req.params
    console.log("this is accounts id", accounts_id)
    AccountsService.getFav(req.app.get('db'), accounts_id)
      .then(favorite => {
        if (!accounts_id) {
          logger.error(`Favorite with id ${accounts_id} not found`)
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

    const favorite_id  = req.params.accounts_id
    console.log("this is fav id", req.params)
    AccountsService.deleteFav(req.app.get('db'), favorite_id)
      .then((numberOfAffectedRows) => {
      
        logger.info(`Favorite with id ${favorite_id} deleted`)
        res.status(204).end()
      })
      .catch(next)
  })

//add a new favorite into current account
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
  

  module.exports = accountsRouter;