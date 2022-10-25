
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
router.post('/getclinets', async(req, res, next) => {
    let conn;
    try {
        let {username} = req.body;
        if (!(username)) {
            res.status(400).send({"message":"All input is required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM userinfo WHERE emailid='"+username+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(400).send({"message":"user not found incorrect username"})
        }
        let userid= rows[0].id
        var sqlSearch = "SELECT * FROM clients INNER JOIN clinetlist ON clients.id = clinetlist.clientid AND clinetlist.clinicianid='"+userid+"'";
        let clientlist = await conn.query(sqlSearch)
        res.status(200).send(clientlist)
    }catch(error) {
        console.error(error);
        res.status(400).send({"message":"something went error"});

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
    let category = "client";
    if (!(clinicianid) && !(clientname) && !(emailid) && !(password)) {
        res.status(400).send({"message":"All input is required"});
        return;
    }
    const encryptpassword = await bcrypt.hash(password, 10);
    console.log("encrypt password = " ,encryptpassword)
    conn = await pool.getConnection();
    let fidnQuery = "SELECT * FROM userinfo WHERE emailid='"+emailid+"'";
    let findUser = await conn.query(fidnQuery);
    console.log(findUser)
    if (findUser.length>0) {
        res.status(400).send({"message":"user already exist"});
        return;
    }
    let result = await conn.query("INSERT INTO userinfo(emailid, category, passwords) VALUES(?,?,?)",[emailid, category, encryptpassword]);
    console.log("in userinfo:-", result)

    if (result==undefined) {
        console.log("unable into useinfo table");
        res.status(400).send({"message":"user not added"});
        return;
    }
    let clientUpdate = await conn.query("INSERT INTO clients(fullname, address, clinetid) VALUES(?,?,?)",[fullname, null, parseInt(result.insertId)]);
    console.log("clientUpdates")
    if (clientUpdate==undefined) {
        console.log("unable into clients table")
        res.status(400).send({"message":"user not added"});
        return;
    }
    let listupdate = await conn.query("INSERT INTO clinetlist(clinicianid, clientid) VALUES(?,?)",[clinicianid, parseInt(clientUpdate.insertId) ] );


    console.log("updated lisit"+listupdate);
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
