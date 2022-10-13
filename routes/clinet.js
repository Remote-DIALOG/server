const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
router.post('/getSessionDates', async(req, res, next) => {
    let conn;
    try {
        let clientid = req.body.clientid;
        if(!(clientid)) {
            res.status(200).send({"message":"All input required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM session WHERE clientid='"+clientid+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(200).send({"message":"no data found"});
            return;
        }
        res.status(200).send(rows)
    } catch(error) {
        console.log(error);
        res.status(400).send({"message":"something went wrong"});
    } finally {
        if (conn) return conn.release();
    }
});
module.exports = router;