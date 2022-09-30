// const bcrypt = require('bcryptjs/dist/bcrypt');
// const jwt = require('jsonwebtoken');
// const conn = require('../config/database');
// tablelist = {
//     "usertable" : "CREATE TABLE IF NOT EXISTS usertable (name VARCHAR(225) NOT NULL PRIMARY KEY, password VARCHAR(225), type VARCHAR(225), emailid VARCHAR(225))",
//     "clinician" :"CREATE TABLE IF NOT EXISTS clinician (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(225), emailId VARCHAR(225), clientid JSON)",
//     "client"    : "CREATE TABLE IF NOT EXISTS clients (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(225), password VARCHAR(225))",
//     "question"  : "CREATE TABLE IF NOT EXISTS questions(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, text VARCHAR(225), rating INT)",
//     "records"   : "CREATE TABLE IF NOT EXISTS records (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, clientId INT, questionId INT, response INT, create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (clientId) REFERENCES clients(id) ,FOREIGN KEY (questionId) REFERENCES questions(id))",
//     "action"    : "CREATE TABLE IF NOT EXISTS action(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, created_by INT, body VARCHAR(225), FOREIGN KEY(created_by) REFERENCES clients(id))"

// }
// for (const [key, value] of Object.entries(tablelist)) {
//     conn.query(value, function(error, result) {
//         if (error) {
//             console.log(error);
//             throw error;
//         }
//         console.log(key+" table created")
//     })
// }
// var q = "INSERT INTO usertable (name, password,type, emailid ) VALUES ('suyog', '$2a$10$Iw913zA69oS5uLNb9V0P0e6peNU0fQ7x/mhtatQQKnFLM36DcrPzS', 'clinician','suyog@gmail.com')";
// conn.query(q, function(err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });