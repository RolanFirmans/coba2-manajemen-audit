const express = require('express')
const router = express.Router()

const getData = require('../Controller/datakaryawan')
router.get("/", getData)

module.exports = router