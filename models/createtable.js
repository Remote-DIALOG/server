// use dialogplus;
// CREATE TABLE IF NOT EXISTS userinfo (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(225), password VARCHAR(225), category VARCHAR(225), full_name varchar(255));
// CREATE TABLE IF NOT EXISTS clientlist(clinicianid INT, clientid INT, FOREIGN KEY (clinicianid) REFERENCES userinfo(id), FOREIGN KEY (clientid) REFERENCES userinfo(id));
// CREATE TABLE IF NOT EXISTS session (
// 	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
//     clientId INT, FOREIGN KEY (clientid) REFERENCES userinfo(id), 
// 	scale VARCHAR(225),
//     rating INT,
//     helped VARCHAR(225),
//     selected VARCHAR(225),
//     created_at VARCHAR(225));
// CREATE TABLE  IF NOT EXISTS actionitems (
// id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
// sessionid INT,FOREIGN KEY (sessionid) REFERENCES session(id),
// scale VARCHAR(225),
// item TEXT(500)
// );
// CREATE TABLE IF NOT EXISTS notes(	
//     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//         clientId INT,FOREIGN KEY (clientId) REFERENCES userinfo(id),
//         message TEXT(500),
//         created_at VARCHAR(255),
//         sessiontime VARCHAR(255)
//    );
// CREATE TABLE IF NOT EXISTS parent_child_notes(
// 	parent_note_id INT, FOREIGN KEY (parent_note_id) REFERENCES notes(id),
//     child_note_id INT, FOREIGN KEY (child_note_id) REFERENCES notes(id)
// );
// alter table session add clinicianId int;
// ALTER TABLE session ADD FOREIGN KEY (clinicianId) REFERENCES userinfo(id); 
// username = qmul
// password = F0r906yr@
// const mariadb = require("mariadb");
// const pool = mariadb.createPool({
//     host: 'localhost', 
//     port: '3306',
//     user: 'qmul',
//     password:'F0r906yr@',
//     database:'dialogplus', 
//     connectionLimit: 5
// });
// module.exports={
//     getConnection: function(){
//         return new Promise(function(resolve,reject){
//             pool.getConnection().then(function(connection){
//                 resolve(connection);
//             }).catch(function(error){
//                 reject(error);
//             });
//         });
//     }
// }