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

        for (var i=0;i<currentSession.length;i++) {
            if (currentSession[i].hasOwnProperty("name")) {
                let scale = currentSession[i].name;
                let rating = currentSession[i].value;
                let help = currentSession[i].help;
                let selected = currentSession[i].select;
                let actionitems = currentSession[i].actionitems;
                if (actionitems.length>0) {
                    for (var index=0; index<actionitems.length;index++) {
                        await conn.query("INSERT INTO session(clientId, scale, rating, helped, selected, created_at, actionitem) VALUES(?,?,?,?,?,?,?)",[clinetid, scale, rating, help, selected, created_at, actionitems[index]]);
                    }
                }
                else {
                    let result = await conn.query("INSERT INTO session(clientId, scale, rating, helped, selected, created_at, actionitem) VALUES(?,?,?,?,?,?,?)",[clinetid, scale, rating, help, selected, created_at, null]);
                    console.log("inseration in session table ", currentSession[i], result);
                }
            }
        }
        // await conn.commit();x
        res.status(200).send({"message":"session is inserted into table"});
    
    }catch(error) {
        console.log(error)
        conn.rollback();
        res.status(400).send({"message":"Something went wrong", "error":error.stack})

    }finally {
        if (conn) conn.release()
    }
    

});
router.post('/getPastSession', async (req, res) => {
    let conn;
    try {
        let clientId = req.body.clientId;
        if (clientId==undefined) {
            res.status(400).send({"message":"clinet id is missing"})
            return;
        }
        conn = await pool.getConnection()
        let fidnQuery = "SELECT * FROM session WHERE clientId='"+clientId+"'";
        let result = await conn.query(fidnQuery);
        if (result.length==0) {
            res.status(404).send({"message":"no session found for this clinetid"})
            return;
        }
        let dates = []
        for (var index = 0; index<result.length; index++) {
            let time = JSON.stringify(result[index].created_at)

            if (dates.includes(time)==false) {
                dates.push(time)
            }
        }
        
        let session = []
        for (var i = 0; i<dates.length; i++) {
            var tmp = []
            for (var j = 0; j< result.length;j++) {
                if (dates[i] == JSON.stringify(result[j].created_at)) {
                    tmp.push({
                        "name":result[j].scale,
                        "value":result[j].rating
                    })
                }
            }
            tmp.unshift({"created_by":clientId})
            tmp.unshift({"created_at":dates[i]})

            session.push(tmp)
        }
        res.status(200).send(session)
    }catch(error) {
        console.log(error)
        res.status(400).send({"message":"something went wrong", "error":error.stack})
    } finally {
        if (conn) conn.release()
    }
});
module.exports = router;