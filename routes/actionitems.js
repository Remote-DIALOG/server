const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
router.post('/addNotes', async(req, res, next) => {
    let conn;
    try {
        console.log(req.body)
        let createAt = req.body.created_at;
        let createdBy = req.body.createdby;
        let message  = req.body.message
        if (!(createdBy) || !(createAt) || !(message)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let result = await conn.query("INSERT INTO notes(created_at, created_by, message) VALUES(?,?,?)",[createAt, createdBy, message]);
        if (result==undefined) {
            console.log("unable into useinfo table");
            res.status(400).send({"message":"cant add notes to database"});
            return;
        }
        res.status(200).send({"message":"suceesfully added to database"});
    }catch(error) {
        console.log(error);
        res.status(400).send({"message":"something went wrong", "error":error.stack})
    } finally {
        if (conn) return conn.release();
    }
});


router.post('/getnotes', async(req, res, next) => {
    let conn;
    console.log("getnotes")
    try {
        console.log(req.body)
        let {emailid} = req.body;
        if (!(emailid)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM notes WHERE created_by='"+emailid+"'";
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