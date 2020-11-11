const StoresService = {
  getByLanguage(db, language) {
    return db
      .select('*')
      .from("stores")
      .where("languages", "like", `%${language}%`)
      
  },
  //with this where i cant compare exactly
  //because my seed is a string of multiple langs
  //so within this string of multiple langs in my seed does
  //this lang match ""like"""
  //the reason for the template literal i need
  //to sandwhich my value in %
  //and in order to get my value
  //i need to use my template literal

  getAll(db) {
    return db
      .select('*')
      .from('stores')
  }
};

module.exports = StoresService;
