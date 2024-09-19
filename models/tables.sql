CREATE TABLE `userinfo` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(225) DEFAULT NULL,
    `password` varchar(225) DEFAULT NULL,
    `category` varchar(225) DEFAULT NULL,
    `full_name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci
 
 CREATE TABLE `clientlist` (
     `clinicianid` int(11) DEFAULT NULL,
     `clientid` int(11) DEFAULT NULL,
     KEY `clinicianid` (`clinicianid`),
     KEY `clientid` (`clientid`),
     CONSTRAINT `clientlist_ibfk_1` FOREIGN KEY (`clinicianid`) REFERENCES `userinfo` (`id`),
     CONSTRAINT `clientlist_ibfk_2` FOREIGN KEY (`clientid`) REFERENCES `userinfo` (`id`)
   )
  
 
 CREATE TABLE `session` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `clientId` int(11) DEFAULT NULL,
     `scale` varchar(225) DEFAULT NULL,
     `rating` int(11) DEFAULT NULL,
     `helped` varchar(225) DEFAULT NULL,
     `selected` varchar(225) DEFAULT NULL,
     `created_at` varchar(225) DEFAULT NULL,
     `actionitem` text DEFAULT NULL,
     `clinicianId` int(11) DEFAULT NULL,
     PRIMARY KEY (`id`),
     KEY `clientId` (`clientId`),
     KEY `clinicianId` (`clinicianId`),
     CONSTRAINT `session_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`),
     CONSTRAINT `session_ibfk_2` FOREIGN KEY (`clinicianId`) REFERENCES `userinfo` (`id`)
   )
 
  CREATE TABLE `notes` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `clientId` int(11) DEFAULT NULL,
     `message` text DEFAULT NULL,
     `created_at` varchar(255) DEFAULT NULL,
     `sessiontime` varchar(255) DEFAULT NULL,
     `created_by` int(11) DEFAULT NULL,
     PRIMARY KEY (`id`),
     KEY `clientId` (`clientId`),
     CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `userinfo` (`id`)
   )
  
 
  CREATE TABLE `log` (
     `message` text DEFAULT NULL
   )
 
 