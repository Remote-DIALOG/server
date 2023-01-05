const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.post('/', async(req, res, next) => {
    res.status(200).send("Server is alive")
})
module.exports = router;