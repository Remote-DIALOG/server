const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');

router.post('/saveSession', async(req, res, next) => {
    let {clientid, seesioninfo} = req.body;
    if (!(clientid) && !(sessioninfo)) {
        res.status(200).send({"message":"All input required"});
        return;
    }


    
});
module.exports = router;