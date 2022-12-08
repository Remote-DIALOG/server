// use dialogplus;
// CREATE TABLE IF NOT EXISTS userinfo (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username VARCHAR(225), password VARCHAR(225), category VARCHAR(225), lastlogin VARCHAR(255));
// CREATE TABLE IF NOT EXISTS clinician (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, full_name VARCHAR(225), clinicianid INT,  FOREIGN KEY (clinicianid) REFERENCES userinfo(id));
// CREATE TABLE IF NOT EXISTS client (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, full_name VARCHAR(225), clientid INT,  FOREIGN KEY (clientid) REFERENCES userinfo(id));
// CREATE TABLE IF NOT EXISTS clientlist(clinicianid INT, clientid INT, FOREIGN KEY (clinicianid) REFERENCES clinician(clinicianid), FOREIGN KEY (clientid) REFERENCES client(clientid));
// CREATE TABLE IF NOT EXISTS session (
// 	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
//     clientId INT, FOREIGN KEY (clientid) REFERENCES client(clientid), 
//     clinicianid INT, FOREIGN KEY (clinicianid) REFERENCES clinician(clinicianid),
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
// 	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     sessionid INT,FOREIGN KEY (sessionid) REFERENCES session(id),
//     userid INT, FOREIGN KEY (userid) REFERENCES userinfo(id),
//     commet TEXT(500),
//     created_at VARCHAR(255)
// );
// CREATE TABLE IF NOT EXISTS parent_child_notes(
// 	parent_note_id INT, FOREIGN KEY (parent_note_id) REFERENCES notes(id),
//     child_note_id INT, FOREIGN KEY (child_note_id) REFERENCES notes(id)
// );