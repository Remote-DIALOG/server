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
        if (currentSession.length!=13){
            res.status(200).send({"message":"input is not correct check again"});
            return;
        }
        let created_by = currentSession['created_by']
        let created_at = currentSession['created_at']
        console.log(created_by, created_at)
        // for(var i=0;i<currentSession.lenght;i++) {
        //     if (currentSession[i])
        //     let result = await conn.query("INSERT INTO (emailid, category, passwords) VALUES(?,?,?)",[emailid, category, encryptpassword]);

        // }
    
    }catch(error) {
        console.log(error)
        res.status(400).send({"message":"Something went wrong", "error":error.stack})

    }finally {
        if (conn) conn.release()
    }
    

});
module.exports = router;