const StoresService = {
  getByLanguage(db, language) {
    return db
      .select('*')
      .from("stores")
      .where("languages", "like", `%${language}%`)
      
  },
  
  getAll(db) {
    return db
      .select('*')
      .from('stores')
  }
 };

module.exports = StoresService;
