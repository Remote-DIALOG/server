const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');

router.post('/saveSession', async(req, res, next) => {
    let conn;
    try{
        conn = await pool.getConnection()
        let currentSession = req.body;
        if (currentSession==undefined || Object.keys(currentSession).length === 0 && Object.getPrototypeOf(currentSession) === Object.prototype){
            res.status(200).send({"message":"input is not correct check again"});
            return;
        }
        let created_at, clinetid
        for(var i=0;i<currentSession.length;i++) {
            if (currentSession[i].hasOwnProperty("created_at")) {
                created_at = currentSession[i].created_at
            }
            if (currentSession[i].hasOwnProperty("created_by")) {
                clinetid = currentSession[i].created_by
            }
        }
        // console.log(created_at, clinetid)
        for (var i=0;i<currentSession.length;i++) {
            if (currentSession[i].hasOwnProperty("name")) {
                console.log(currentSession[i])
                let result = await conn.query("INSERT INTO session(clientid, scale, rating, date,help) VALUES(?,?,?,?,?)",[clinetid, currentSession[i].name, currentSession[i].value, created_at, null]);
                console.log("inseration in session table ", currentSession[i], result);
            }
        }
        res.status(200).send({"message":"session is inserted into table"});
    
    }catch(error) {
        console.log(error)
        res.status(400).send({"message":"Something went wrong", "error":error.stack})

    }finally {
        if (conn) conn.release()
    }
    

});
module.exports = router;