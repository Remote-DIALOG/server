
const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const mysql = require('mysql')
const util = require('util');
const { errorMonitor } = require('events');
const query = util.promisify(conn.query).bind(conn);
// Profile
router.post('/getclinets', async(req, res, next) => {
    try {
        let {username} = req.body.args;
        if (!(username)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        var sqlSearch = "SELECT * FROM userinfo WHERE emailid = ?"
        var search_query = mysql.format(sqlSearch,[username])
        let userinfo = await query(search_query)
        if (userinfo.length == 0) {
            res.status(400).send({"message":"user not found incorrect username"})
        }
        let userid= userinfo[0].id
        var sqlSearch = "SELECT * FROM clients INNER JOIN clinetlist ON clients.id = clinetlist.clientid AND clinetlist.clinicianid =?"
        var search_query = mysql.format(sqlSearch,[userid])
        let clientlist = await query(search_query)
        res.status(200).send(clientlist)
    }catch(error) {
        console.error(error);
        res.status(400).send("something went error");
        
    }
})
router.post("/addCliner", async(req, res, next) => {
    
}) 
router.get('/profile', auth, (req, res, next) => {
    res.status(200).send("welcome to profile")
});

module.exports = router;