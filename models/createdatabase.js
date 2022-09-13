let con = require('../config/database');
con.query("CREATE DATABASE IF NOT EXISTS dialogplus", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
con.changeUser({database : 'dialogplus'}, (err) => {
    if (err) {
      console.log('Error in changing database', err);
      return;
    }
    console.log("Databse change")
})
