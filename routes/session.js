const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');
const {removeObject} = require('../utils/encryptPassword')
const fs = require('fs');
const path = require('path');
router.post('/saveSession', async(req, res, next) => {
    let conn;
    try{
        conn = await pool.getConnection()
        let currentSession = req.body;
        if (currentSession==undefined || Object.keys(currentSession).length === 0 && Object.getPrototypeOf(currentSession) === Object.prototype){
            res.status(200).send({"message":"input is not correct check again"});
            return;
        }
        let created_at, clinetid, clinicianId = null
        for(var i=0;i<currentSession.length;i++) {
            if (currentSession[i].hasOwnProperty("created_at")) {
                created_at = currentSession[i].created_at
            }
            if (currentSession[i].hasOwnProperty("created_by")) {
                clinetid = currentSession[i].created_by
            }
            if (currentSession[i].hasOwnProperty("clinicianID")) {
                clinicianId = currentSession[i].clinicianID;
            }
        }
        let alreadyExit = await conn.query("SELECT * FROM session WHERE created_at='"+created_at+"'");
        if (alreadyExit.length>0) {
            res.status(200).send({"message":"Session is already saved"})
            return;
        }
        console.log("clinician id --------->", clinicianId)
        for (var i=0;i<currentSession.length;i++) {
            if (currentSession[i].hasOwnProperty("name")) {
                let scale = currentSession[i].name;
                let rating = currentSession[i].value;
                let help = currentSession[i].help;
                let selected = currentSession[i].select;
                let actionitems = currentSession[i].actionitems;
                if (actionitems.length>0) {
                    for (var index=0; index<actionitems.length;index++) {
                        await conn.query("INSERT INTO session(clientId, scale, rating, helped, selected, created_at, actionitem, clinicianId) VALUES(?,?,?,?,?,?,?,?)",[clinetid, scale, rating, help, selected, created_at, actionitems[index], clinicianId]);
                    }
                }
                else {
                    let result = await conn.query("INSERT INTO session(clientId, scale, rating, helped, selected, created_at, actionitem, clinicianId) VALUES(?,?,?,?,?,?,?,?)",[clinetid, scale, rating, help, selected, created_at, null, clinicianId]);
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


router.post("/getfullsummary", async(req, res) => {
    let conn;
    try {
        let {clientId} = req.body;
        if (clientId==undefined) {
            res.status(400).send({"message":"all input required"});
            return;
        }
        conn = await pool.getConnection();
        
        let sessioninfo = await conn.query("SELECT * from session WHERE clientId='"+clientId+"'");
        if (sessioninfo==undefined || sessioninfo.length==0) {
            res.status(404).send({"message":"no data found"});
            return;
        }
        let dates = []
        for (var i = 0; i<sessioninfo.length;i++) {
            let time = JSON.stringify(sessioninfo[i].created_at)
            if (dates.includes(time)==false) {
                dates.push(time)
            }
        }
        let session_data = []
        for (var i=0;i<dates.length;i++) {
            let session_summary = [ {"created_at":""},{"actionitem":[]}]
            for (var j=0;j<sessioninfo.length;j++) {
                if (dates[i].replace(/['"]+/g, '') === sessioninfo[j].created_at) {
                    if (sessioninfo[j].actionitem!=null)
                        session_summary[1].actionitem.push(sessioninfo[j].actionitem)
                }
                session_summary[0].created_at = dates[i].replace(/['"]+/g, '')
               
            }
            session_data.push(session_summary);
        }
        session_data = session_data.reverse()
        res.status(200).send(session_data)
    } catch(error) {
        console.log(error) 
        res.status(400).send({"message":"something went wrong","error":error.stack})

    } finally {
        if (conn) conn.release()
    }

});
router.post('/getsessiondata', async(req, res)=> {
    let conn;
    try {
        let {clientId, timestampe} = req.body;
        if (clientId==undefined || timestampe==undefined) {
            res.status(400).send({"message":"all input required"});
            return;
        }
        
        conn = await pool.getConnection();
        if (timestampe=="all") {
            
            let sessioninfo = await conn.query("SELECT * from session WHERE clientId='"+clientId+"'");
            if (sessioninfo==undefined || sessioninfo.length==0) {
                res.status(404).send({"message":"no data found"});
                return;
            }
            let dates = []
            for (var i = 0; i<sessioninfo.length;i++) {
                let time = JSON.stringify(sessioninfo[i].created_at)
                if (dates.includes(time)==false) {
                    dates.push(time)
                }
            }
            let data = []
            for (var i=0;i<dates.length;i++) {
                let sessoion_data = [
                    {"created_at":""},
                    {"name": "Mental health",actionitems:[]},
                    {"name":"Physical health",actionitems:[]},
                    {"name":"Job situation",actionitems:[]},
                    {"name":"Accommodation" ,actionitems:[]},
                    {"name":"Leisure activities" ,actionitems:[]},
                    {"name":"Relationship with partner/family",actionitems:[]},
                    {"name":"Friendships",actionitems:[]},
                    {"name":"Personal safety",actionitems:[]},
                    {"name":"Medication",actionitems:[]},
                    {"name":"Practical help",actionitems:[]},
                    {"name":"Meetings",actionitems:[]}
                ]
                for (var j=0;j<sessioninfo.length;j++) {
                    if (dates[i].replace(/['"]+/g, '')===sessioninfo[j].created_at) {
                        for (var k=0;k<sessoion_data.length;k++) {
                            if(sessoion_data[k].name===sessioninfo[j].scale && sessioninfo[j].actionitem!=null){
                                sessoion_data[k].actionitems.push(sessioninfo[j].actionitem);
                            }
                        }
                        sessoion_data[0].created_at = sessioninfo[j].created_at;
                    }
                   
                }
                data.push(sessoion_data);
            }

            data = data.reverse()
            res.status(200).send(data)

        }
        else {
            let current_session = [
                {"created_at":""},
                {"created_by":0},
                {"name": "Mental health","value" :0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Physical health","value": 0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Job situation","value": 0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Accommodation" ,"value": 0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Leisure activities" ,"value":0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Relationship with partner/family","value":0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Friendships","value":0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Personal safety","value": 0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Medication","value":0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Practical help","value":0, "help":null, "select":false, open:false,actionitems:[]},
                {"name":"Meetings","value":0, "help":null, "select":false, open:false,actionitems:[]}
              ];
            let data = await conn.query("SELECT * from session WHERE clientId='"+clientId+"'"+"&& created_at='"+timestampe+"'");
            if (data.length===0) {
                res.status(404).send({"message":"no session found for clientId "+clientId})
                return;
            }
            for (var i=0;i<data.length;i++) {
                for (j=0; j<current_session.length;j++) {
                    if (data[i].scale === current_session[j].name) {
                        current_session[j].name = data[i].scale;
                        current_session[j].value = data[i].rating;
                        current_session[j].help = data[i].help;
                        if (data[i].actionitem!=null) { 
                            current_session[j].actionitems.push(data[i].actionitem) 
                        }
                    }
                }
            }
            current_session[0].created_at = timestampe
            current_session[1].created_by = clientId;
            current_session = current_session.reverse()
            res.status(200).send(current_session)
            
        }
        
    } catch(error) {
        console.log(error) 
        res.status(400).send({"message":"something went wrong","error":error.stack})
    }finally {
        if (conn) conn.release();
    }
});
router.post('/saveLogs', async(req, res) => {
    let conn;
    const logFilePath = path.join(__dirname, 'server.log');
    try{
        let log_message = req.body.message;
        // console.log("in logs api call-------------------->", log_message)
        if (log_message==undefined) {
            res.status(400).send({"message":"message is empty"})
            return;
        }
        // fs.appendFileSync(logFilePath, log_message);
        // res.end('Hello, World!');
        conn = await pool.getConnection()
        let data = await conn.query("INSERT INTO log(message) VALUES(?)",[log_message]);
        res.status(200).send({"message":"inserted sucessfully"})
        
    }catch(error) {
        console.log(error) 
        res.status(400).send({"message":"something went wrong","error":error.stack})
    }finally {
        if (conn) conn.release();
    }
});
module.exports = router;