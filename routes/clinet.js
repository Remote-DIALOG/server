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
            res.status(400).send({"message":"All input required"});
            return;
        }
        conn = await pool.getConnection();
        let query = "SELECT * FROM session WHERE clientid='"+clientid+"'";
        let rows = await conn.query(query);
        if (rows==undefined || rows.length==0) {
            res.status(404).send({"message":"no data found"});
            return;
        }
        let dates = []
        for (var i = 0; i<rows.length;i++) {
            let time = JSON.stringify({"date":rows[i].created_at, "clinicianId":rows[i].clinicianId})
            if (dates.includes(time)==false) {
                dates.push(time)
            }
        }
        dates = dates.reverse()
        for (let i=0; i<dates.length;i++){
            dates[i] = JSON.parse(dates[i])
        }
        // console.log(dates)
        res.status(200).send(dates)
    } catch(error) {
        console.log(error);
        res.status(400).send({"message":"something went wrong", "error":error.stack});
    } finally {
        if (conn) return conn.release();
    }
});
router.post('/getClinetinfo', async(req, res, next) => {
    let conn;
    try {
        let {id} = req.body
        if (!id) {
            console.log(req.body)
            res.status(400).send({"message":"all input required"})
            return
        }
        let findUser = "SELECT * from userinfo WHERE id="+id;
        conn = await pool.getConnection()
        let data = await conn.query(findUser)
        if (data==undefined || data.length==0) {
            res.status(400).send({"message":"user not found in clients tables"})
            return
        }
        res.status(200).send(data[0])
    }catch(error) {
        console.log(error)
        res.status(400).send({"message":"something went wrong", "error":error.stack})
    } finally {
        if (conn) conn.release()
    }
});
module.exports = router;