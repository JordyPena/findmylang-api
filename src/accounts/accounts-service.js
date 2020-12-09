const AccountsService = {
  addAccount(db, newAccount) {
    return db
      .select('*')
      .from('accounts')
      .where({username: newAccount.username})
      .first()
      .then(user => {
        console.log("this is user", user)
        return !user && db
          .insert(newAccount, console.log("newAccount is", newAccount))
          .into('accounts')
          .returning(['id','username'])
          .then(rows => {
            console.log("rows is", rows)
            return rows[0];
          })
      })
     
  },

  getAllAccounts(db) {
    return db
    .select('*')
    .from('accounts')
  },
 

  getAccount(db, username, password) {
    return db
      .select(['id','username'])
      .from('accounts')
      .where({username: username,
      password: password})
      .first()
  },

  deleteAccount(db, id) {
    return db('accounts')
      .where({
        id: id
      })
      .delete();
  },

  addNewFav(db, accounts_id, store_id) {
   
    const newFav = {accounts_id: accounts_id,
    store_id: store_id}
 
    return db
    .insert(newFav)
    .into('favorites')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
  },

  getFav(db, accounts_id) {
    return db
      .from('favorites')
      .select('*')
      .where('accounts_id', accounts_id)
      
  },

  deleteFav(db, id) {
    return db('favorites')
      .where({
        id: +id
      })
      .delete()
  }
}

module.exports= AccountsService;