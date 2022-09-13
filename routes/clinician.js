
const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const mysql = require('mysql')

// Profile
router.post('/getclinets', async(req, res, next) => {
    try {
        let {username} = req.body;
        if (!(username)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        const sqlSearch = "SELECT * FROM clinician WHERE emailId = ?"
        const search_query = mysql.format(sqlSearch,[username])
        let userinfo = await conn.query(search_query, async(error, result) => {
            if (error) throw error
            if (result.length==0 ) {
                res.status(200).send({"message":"username not found"})
                return;
            }
            else {
                let userinfo = result[0];
                let clientid = JSON.parse(userinfo.clientid);
                let clinetlist = [];
                console.log(clientid)
                console.log(typeof(clientid))
                    var sqlSearch = "SELECT name FROM clients WHERE id In ?"
                    var search_query = mysql.format(sqlSearch,clientid)
                    var clinetname = await conn.query(search_query);
                    console.log(clinetname)
                // const token = jwt.sign({user_id: userinfo._id, username},process.env.TOKEN_KEY,{expiresIn: "2h"});
                // userinfo.token = token;
                res.status(200).send(userinfo);
                return;

            }
        });

    }catch(error) {
        console.error(error);
        res.status(400).send("something went error");
        
    }
})
router.get('/profile', auth, (req, res, next) => {
    res.status(200).send("welcome to profile")
});

module.exports = router;