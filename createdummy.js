let mysql = require('mysql');
const bcrypt = require('bcryptjs')

let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password'
});
// $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G
conn.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

conn.query("CREATE DATABASE IF NOT EXISTS dialogplus", function (err, result) {
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
var sql = "CREATE TABLE IF NOT EXISTS userinfo(id INT NOT NULL AUTO_INCREMENT, emailid VARCHAR (255), category VARCHAR (255), passwords VARCHAR (255), PRIMARY KEY(id))";

conn.query(sql, function(error, result) {
    if (error){
        console.log("error"+error)
    }
    console.log("userinfo table created");
});
var insert1 = "INSERT INTO userinfo(emailid, category, password) VALUES ('suyog@gmail.com','clinician', '$2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('abc@gmail.com', 'clinician',  '$2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('test@gmail.com', 'client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('test1@gmail.com','client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'), ('test2@gmail.com','client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G')";
conn.query(insert1, function(error, result) {
    if (error) {
        console.log("error"+error)
    }
    console.log("inserted into table");
})
// CREATE DATABASE IF NOT EXISTS dialogplus;
// USE dialogplus;
// CREATE TABLE IF NOT EXISTS userinfo(id INT NOT NULL AUTO_INCREMENT, emailid VARCHAR (255), category VARCHAR (255), passwords VARCHAR (255), PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS clinician(id INT NOT NULL AUTO_INCREMENT, fullname VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS clients(id  INT NOT NULL AUTO_INCREMENT, fullname VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id));
// CREATE TABLE IF NOT EXISTS clinetlist(clinicianid INT, clientid INT, FOREIGN KEY(clinicianid) REFERENCES clinician(id), FOREIGN KEY(clientid) REFERENCES clients(id)); 
// CREATE TABLE IF NOT EXISTS session (
//   id INT NOT NULL AUTO_INCREMENT, 
//   clientid INT, 
//   scale VARCHAR(255), 
//   rating INT, 
//   date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
//   help VARCHAR(255),
//   PRIMARY KEY(id)
//  FOREIGN KEY(clientid) REFERENCE userinfo(id)
// );



// INSERT INTO clinician(fullname, address) VALUES ('suyog pipliwal','address 1');
// INSERT INTO clients(fullname, address) VALUES ('test', 'address 2'),('test1','address 3'), ('test2','address 4');
//INSERT INTO clinetlist(clinicianid, clientid) VALUES (1,1),(1,2),(1,3)
// INSERT INTO userinfo(emailid, category, passwords) VALUES ('suyog@gmail.com','clinician', '$2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('abc@gmail.com', 'clinician',  '$2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('test@gmail.com', 'client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'),('test1@gmail.com','client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G'), ('test2@gmail.com','client',' $2a$10$rGJk.ZMkTZDHS5vJy0BbSeDpGCil413clyv5FosAOpOKYOdlVkO2G');


