
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/client_register', async (req, res, next) => {  
    try{
        const {first_name, last_name, phone_number} = req.body;
        //validate user
        if (!(phone_number && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        const olduser = await User.doesExist(phone_number);
        if (olduser!=null) {
            return res.status(400).send("user already exsit")
        }
        const password = User.generate_password(6);
        const user = await User.addUser(phone_number, password, first_name, last_name, "client");
        user.plain_password = password
        res.status(201).send(user);
    } catch(error) {
        console.log(error)
        res.status(400).send("server error")
    }
});

// Authenticate
router.post('/clinician_registration', async(req, res, next) => {
    try {
        const {emailId, first_name, last_name, password} = req.body;
        if (!(emailId && first_name && last_name && password)) {
            res.send(400).send("all input required");
        }
        const alreadyExist = await User.doesExist(emailId);
        if (alreadyExist!=null) {
            res.status(400).send("user already exit");
        }
        const user = await User.addUser(emailId, password, first_name, last_name, "clinician");
        res.status(200).send(user)
    }catch (error) {
        console.error(error);
        res.status(400).send(error)
    }
});

// Profile
router.get('/login', async(req, res, next) => {
    try {
        
    }catch(error) {
        
    }
})
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;