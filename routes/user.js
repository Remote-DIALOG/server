
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/login', async(req, res, next) => {
    let conn;
    try {
        let {username, password} = req.body;
        if (!(username && password)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM userinfo WHERE username='"+username+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(400).send({"message":"User no found"});
            return;
        }
        let comparepassword = await bcrypt.compare(password, rows[0].password)
        if (!comparepassword) {
            res.status(400).send({"message":"Password does not match"});
            return;
        }
        let userinfo = rows[0];
        let token = jwt.sign({user_id: userinfo._id, userinfo},process.env.TOKEN_KEY,{expiresIn: "2h"});
        userinfo.token = token;
        res.status(200).send(userinfo);
        return;
    }catch(error) {
        console.error(error);
        res.status(400).send({"message":"Something went error", "error":error.stack});
        
    } finally {
        if (conn) return conn.release();
    }
})
router.post('/resetPassword', async(req, res, next)=> {
    console.log(req.body)
    let conn;
    try {
        let {username, newPassword} = req.body;
        if (username==="" || newPassword==="") {
            res.status(404).send({"message":"All input is required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM userinfo WHERE emailid='"+username+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(404).send({"message":"user no found"});
            return;
        }
        let encryptPass = await encryptPassword(newPassword) 
        console.log(encryptPass)
        let updatePassword = "UPDATE userinfo SET password='"+encryptPass+"'"+" WHERE emailid='"+username+"'"
        let result = await conn.query(updatePassword)
        res.status(200).send({"message":"update successfull","success":true})
    }catch(error) {
        console.error(error);
        res.status(400).send({"message":"something went error", "error":error.stack});
    } finally {
        if (conn) return conn.release();
    }
})
router.post('/addClinician', async(req, res, next)=> {

    let conn;
    try {
        let {username,password, full_name} = req.body;
       
        let encryptPass = await encryptPassword(password) 
        conn = await pool.getConnection();
        let userinfo = await conn.query("INSERT INTO userinfo(username, password, category, full_name) VALUES(?,?,?,?)",[username, encryptPass, 'clinician', full_name]);
        // if (userinfo==undefined) {
        //     res.send(400).send({"message":"unbale to create user"})
        // }
        console.log(userinfo)
        res.status(200).send({"message":"user creating sucessfully", "clinicianId":parseInt(userinfo.insertId)})
    }catch(error) {
        console.error(error)
        res.status(400).send({"message":"something went error", "error":error.stack});
    } finally {
        if (conn) return conn.release()
    }
})
module.exports = router;