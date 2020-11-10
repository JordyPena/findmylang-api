 const StoresService = {
   getByEmployee(db) {
     return db
      .join('employees', 'stores.id',)

   },
   
   getAllStore(db) {
    return db
     .select('*')
     .from('stores')
  },

  getByName(db, name) {
    return db
      .select('*')
      .from('stores')
      .where({name: name})
  }

  getByLang(db, lang) {
    return db
      .select(*)
      .from(stores)
      //with this where i cant compare exactly
      //because my seed is a string of multiple langs 
      //so within this string of multiple langs in my seed does
      //this lang match ""like"""
      //the reason for the template literal i need
      //to sandwhich my value in % 
      //and in order to get my value 
      //i need to use my template literal
      .where('languages', 'like', `%${lang}%`)
      
  }
   
};

 

 module.exports = StoresService;