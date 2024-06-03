const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
router.post('/addNotes', async(req, res, next) => {
    let conn;
    try {
        let clientId = req.body.clientId;
        let created_at = req.body.created_at;
        let message  = req.body.message;
        let sessiontime = req.body.sessiontime;
        let created_by = req.body.created_by
        console.log("------->", created_by)
        if (!(created_at) || !(clientId) || !(message) || !(sessiontime) || !(created_by)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let result = await conn.query("INSERT INTO notes(clientId, message, created_at, sessiontime, created_by) VALUES(?,?,?,?,?)",[clientId, message, created_at,sessiontime, created_by]);
        if (result==undefined) {
            console.log("unable into notes table");
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
    try {
        let {clientId, timestampe} = req.body;
        if (!(clientId) || !(timestampe)) {
            res.status(400).send({"message": "all input required"});
            return;
        }
        conn = await pool.getConnection();
        let q = `SELECT * FROM notes WHERE clientId='${clientId}' and sessiontime='${timestampe}' `
        // console.log("----", q)
        // let query = "SELECT * FROM notes WHERE clientId='"+clientId+"'"+"and sessiontime='"+timestampe+"'";
        // console.log("query=", query)
        let rows = await conn.query(q);
        if (rows==undefined || rows.length==0) {
            res.status(400).send({"message":"no notes were found"})
            return;
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