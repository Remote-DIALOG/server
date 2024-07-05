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

// 'session', 'CREATE TABLE `session` (\n  `id` int(11) NOT NULL AUTO_INCREMENT,\n  `clientId` int(11) DEFAULT NULL,\n  `scale` varchar(225) DEFAULT NULL,\n  `rating` int(11) DEFAULT NULL,\n  `helped` varchar(225) DEFAULT NULL,\n  `selected` varchar(225) DEFAULT NULL,\n  `created_at` varchar(225) DEFAULT NULL,\n  `actionitem` text DEFAULT NULL,\n  `clinicianId` int(11) DEFAULT NULL,\n  PRIMARY KEY (`id`),\n  KEY `clientId` (`clientId`),\n  KEY `clinicianId` (`clinicianId`),\n  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`),\n  CONSTRAINT `session_ibfk_2` FOREIGN KEY (`clinicianId`) REFERENCES `userinfo` (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=587 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci'
// CREATE TABLE `session` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `clientId` int(11) DEFAULT NULL,
//     `scale` varchar(225) DEFAULT NULL,
//     `rating` int(11) DEFAULT NULL,
//     `helped` varchar(225) DEFAULT NULL,
//     `selected` varchar(225) DEFAULT NULL,
//     `created_at` varchar(225) DEFAULT NULL,
//     `actionitem` text DEFAULT NULL,
//     `clinicianId` int(11) DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     KEY `clientId` (`clientId`),
//     KEY `clinicianId` (`clinicianId`),
//     CONSTRAINT `session_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`),
//     CONSTRAINT `session_ibfk_2` FOREIGN KEY (`clinicianId`) REFERENCES `userinfo` (`id`)
//   ) 

//   # Table, Create Table
// 'session', 'CREATE TABLE `session` (\n  `id` int(11) NOT NULL AUTO_INCREMENT,\n  `clientId` int(11) DEFAULT NULL,\n  `scale` varchar(225) DEFAULT NULL,\n  `rating` int(11) DEFAULT NULL,\n  `helped` varchar(225) DEFAULT NULL,\n  `selected` varchar(225) DEFAULT NULL,\n  `created_at` varchar(225) DEFAULT NULL,\n  `actionitem` text DEFAULT NULL,\n  `clinicianId` int(11) DEFAULT NULL,\n  PRIMARY KEY (`id`),\n  KEY `clientId` (`clientId`),\n  KEY `clinicianId` (`clinicianId`),\n  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`),\n  CONSTRAINT `session_ibfk_2` FOREIGN KEY (`clinicianId`) REFERENCES `userinfo` (`id`)\n) ENGINE=InnoDB AUTO_INCREMENT=587 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci'


// CREATE TABLE `userinfo` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `username` varchar(225) DEFAULT NULL,
//     `password` varchar(225) DEFAULT NULL,
//     `category` varchar(225) DEFAULT NULL,
//     `full_name` varchar(255) DEFAULT NULL,
//     PRIMARY KEY (`id`)
//   ) 

// clientlist, CREATE TABLE `clientlist` (
//     `clinicianid` int(11) DEFAULT NULL,
//     `clientid` int(11) DEFAULT NULL,
//     KEY `clinicianid` (`clinicianid`),
//     KEY `clientid` (`clientid`),
//     CONSTRAINT `clientlist_ibfk_1` FOREIGN KEY (`clinicianid`) REFERENCES `userinfo` (`id`),
//     CONSTRAINT `clientlist_ibfk_2` FOREIGN KEY (`clientid`) REFERENCES `userinfo` (`id`)
//   ) 
//  CREATE TABLE `notes` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `clientId` int(11) DEFAULT NULL,
//     `message` text DEFAULT NULL,
//     `created_at` varchar(255) DEFAULT NULL,
//     `sessiontime` varchar(255) DEFAULT NULL,
//     `created_by` int(11) DEFAULT NULL,
//     PRIMARY KEY (`id`),
//     KEY `clientId` (`clientId`),
//     CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`)
//   ) 
//  CREATE TABLE `log` (
//     `message` text DEFAULT NULL
//   ) 
  