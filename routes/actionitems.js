const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
router.post('/addNotes', async(req, res, next) => {
    let conn;
    console.log("add notes")
    try {
        console.log(req.body.args)
        let {createdBy, createdAt, message} = req.body.args;
        if (!(createdBy) || !(createdAt) || !(message)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let result = await conn.query("INSERT INTO actionitems(createdBy, createdAt, message) VALUES(?,?,?)",[createdBy, createdAt, message]);
        console.log("------->", result);
        if (result==undefined) {
            console.log("unable into useinfo table");
            res.status(400).send({"message":"user not added"});
            return;
        }
        res.status(200).send({"message":"suceesfully added to database"});
    }catch(error) {
        console.log(error);
        res.status(400).send({"message":"something went wrong"})
    } finally {
        if (conn) return conn.release();
    }
});


router.get('/getnotes', async(req, res, next) => {
    let conn;
    console.log("getnotes")
    try {
        console.log(req.body)
        let {emailid} = req.body.args;
        if (!(emailid)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM actionitems WHERE createBy='"+emailid+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(400).send({"message":"action items not found incorrect username"})
        }
        res.status(200).send(rows)
    }catch (error) {
        console.log(error)
        res.status(400).send({"message":"something went wrong"});
    } finally {
        if (conn) return conn.release();
    }
})
module.exports = router;