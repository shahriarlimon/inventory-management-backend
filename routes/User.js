const express = require('express');
const { signup } = require('../controllers/User');
const router = express.Router()

router.post("/", signup)

module.exports = router;