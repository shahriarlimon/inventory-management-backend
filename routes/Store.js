const express = require('express');
const { getStore, createStore, getStoreById } = require('../controllers/Store');
const router = express.Router()
router.get('/', getStore)
router.post("/", createStore)
router.patch("/:id",getStoreById)
module.exports = router;