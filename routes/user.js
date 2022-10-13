
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
var bcrypt      = require('bcryptjs');

router.post('/login', async(req, res, next) => {
    let conn;
    try {
        console.log("-------->", req.body);
        let {username, password} = req.body;
        if (!(username && password)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM userinfo WHERE emailid='"+username+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(200).send({"message":"user no found"});
            return;
        }
        let comparepasswod = await bcrypt.compare(password, rows[0].passwords)
        if (!comparepasswod) {
            res.status(200).send({"message":"password does not match"});
            return;
        }
        let userinfo = rows[0];
        let token = jwt.sign({user_id: userinfo._id, username},process.env.TOKEN_KEY,{expiresIn: "2h"});
        userinfo.token = token;
        res.status(200).send(userinfo);
        return;
    }catch(error) {
        console.error(error);
        res.status(400).send({"message":"something went error", "error":error.stack});
        
    } finally {
        if (conn) return conn.release();
    }
})
module.exports = router;