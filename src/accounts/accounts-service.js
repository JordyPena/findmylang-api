const AccountsService = {
  addAccount(db, newAccount) {
    return db
      .insert(newAccount)
      .into('accounts')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
  },

  getAllAccounts(db) {
    return db
    .select('*')
    .from('accounts')
  },
 

  getAccount(db, username, password) {
    return db
      .select('*')
      .from('accounts')
      .where({username: username,
      password: password})
  },

  deleteAccount(db, id) {
    return db('accounts')
      .where({
        id: id
      })
      .delete();
  },

  addNewFav(db, accounts_id, store_id) {
    console.log("this is accounts_id query side", accounts_id)
    console.log("this is store_id query side", store_id)
    const newFav = {accounts_id: accounts_id,
    store_id: store_id}
    console.log("this is newFav query side", newFav)
    return db
    .insert(newFav)
    .into('favorites')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
  },

  getFav(db, id) {
    return db
      .from('favorites')
      .select('*')
      .where('id', id)
      .first()
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