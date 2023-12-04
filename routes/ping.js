const express = require('express');
const router = express.Router();
router.post('/', async(req, res) => {
    const healthCheck = {
        uptime:process.uptime,
        message:"Ok",
        timestamp: Date.now()
    }
    res.status(200).send(healthCheck)
})
module.exports = router;