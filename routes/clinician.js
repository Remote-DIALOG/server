
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
router.post('/getclinets', async(req, res, next) => {
    let conn;
    try {
        let {username} = req.body;
        if (!(username)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM userinfo WHERE username='"+username+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(400).send({"message":"user not found incorrect username"})
        }
        let userid= rows[0].id
        var sqlSearch = "SELECT * FROM userinfo INNER JOIN clientlist ON clientlist.clientid= userinfo.id AND clientlist.clinicianid='"+userid+"'";
        let clientlist = await conn.query(sqlSearch)
        res.status(200).send(clientlist)
    }catch(error) {
        console.error(error);
        res.status(400).send({"message":"something went error", "error":error.stack});

    } finally {
        if (conn) return conn.release();
    }
})
router.post("/addClient", async(req, res, next) => {
    let conn;
    try {
    let clinicianid  = req.body.clinicianId;
    let fullname = req.body.fullname;
    let emailid = req.body.email;
    let password = req.body.password;
    // console.log("------------>", req.body)
    let category = "client";
    if (!(clinicianid) && !(clientname) && !(emailid) && !(password)) {
        res.status(400).send({"message":"All input is required"});
        return;
    }
    const encryptpassword = await bcrypt.hash(password, 10);
    console.log("encrypt password = " ,encryptpassword)
    conn = await pool.getConnection();
    let fidnQuery = "SELECT * FROM userinfo WHERE username='"+emailid+"'";
    let findUser = await conn.query(fidnQuery);
    if (findUser.length>0) {
        res.status(400).send({"message":"user already exist"});
        return;
    }
    let result = await conn.query("INSERT INTO userinfo(username, category, password, full_name) VALUES(?,?,?,?)",[emailid, category, encryptpassword, fullname]);

    if (result==undefined) {
        console.log("unable into useinfo table");
        res.status(400).send({"message":"user not added"});
        return;
    }
    let listupdate = await conn.query("INSERT INTO clientlist(clinicianid, clientid) VALUES(?,?)",[clinicianid, parseInt(result.insertId) ] );

    if (listupdate==undefined) {
        console.log("unable to insert in clinet list table");
        res.status(400).send({"message":"user not added in list table"});
        return;
    }
    res.status(200).send({"message":"user added sucessfully"});
    }catch(error) {
        console.log("error", error)
        res.status(400).send({"message":"something went wrong", "error":error})
    }
})
module.exports = router;
