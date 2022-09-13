
const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const mysql = require('mysql')

// // Register
// router.post('/client_register', async (req, res, next) => {  
//     try{
//         const {first_name, last_name, phone_number} = req.body;
//         //validate user
//         console.log()
//         if (!(phone_number && first_name && last_name)) {
//             res.status(400).send("All input is required");
//         }
//         const olduser = await User.doesExist(phone_number);
//         if (olduser!=null) {
//             return res.status(400).send("user already exsit")
//         }
//         const password = User.generate_password(6);
//         const user = await User.addUser(phone_number, password, first_name, last_name, "client");
//         user.plain_password = password
//         res.status(201).send(user);
//     } catch(error) {
//         console.log(error)
//         res.status(400).send("server error")
//     }
// });

// Authenticate
// router.post('/clinician_registration', async(req, res, next) => {
//     try {
//         const {emailId, first_name, last_name, password} = req.body;
//         if (!(emailId && first_name && last_name && password)) {
//             res.status(400).send("all input required");
//         }
//         const alreadyExist = await User.doesExist(emailId);
//         if (alreadyExist!=null) {
//             res.status(400).send("user already exit");
//         }
//         const user = await User.addUser(emailId, password, first_name, last_name, "clinician");
//         res.status(200).send(user)
//     }catch (error) {
//         console.error(error);
//         res.status(400).send(error)
//     }
// });

// Profile
router.post('/login', async(req, res, next) => {
    try {
        let {username, password} = req.body.args;
        console.log("----->", req.body)
        if (!(username && password)) {
            res.status(400).send("All input is required");
            return;
        }
        console.log(username)
        const sqlSearch = "SELECT * FROM userinfo WHERE emailid = ?"
        const search_query = mysql.format(sqlSearch,[username])
        let userinfo = await conn.query(search_query, async(error, result) => {
            if (error) throw error
            if (result.length==0 ) {
                res.status(200).send("username not found")
                return;
            }
            else {
                let userinfo = result[0];
                const token = jwt.sign({user_id: userinfo._id, username},process.env.TOKEN_KEY,{expiresIn: "2h"});
                userinfo.token = token;
                res.status(200).send(userinfo);
                return;

            }
        });

    }catch(error) {
        console.error(error);
        res.status(400).send("something went error");
        
    }
})
router.get('/profile', auth, (req, res, next) => {
    res.status(200).send("welcome to profile")
});

module.exports = router;