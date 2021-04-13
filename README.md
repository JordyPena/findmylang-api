# FindMyLang

## Live link 

https://find-my-lang-app.vercel.app/

![Screenshot](https://github.com/JordyPena/Portfolio/blob/main/images/project-screenshots/findmylang-app-screenshot.png)

## Summary

FindMyLang allows the you to find T-mobile store's in Dallas, TX that have
representatives that speak the language you selected. Once a language is selected
you can see your current location compared to the stores that match your request
on a map. Click on the markers on the map for store details and a link to get directions from your current location. You can create an account in order to be
able to add stores to your favorites.

## Environment 

Fullstack app using React.js, CSS, Node, Express, and PostgreSQL.

## API 

FindMyLang API fetches all the stores in the database, all of the accounts created and favorites of those accounts.

Endpoints: 

GET /api/stores  returns all stores

GET /api/stores/store  returns stores that match the language selected

GET /api/accounts  returns returns all accounts

POST /api/accounts  creates a new account, req.body needs username and password

POST /api/accounts/  account logs into account, req.body needs username and password

GET  /api/accounts/favorite/  accounts_id returns all favorites in account, req.params needs accounts_id

POST /api/accounts/favorite  creates a new favorite in current account, req.body needs accounts_id and store_id