const express = require('express')
const router = express.Router()

router.all('/', (req, res, next) => {
    res.send('test page here')
})

module.exports = router;