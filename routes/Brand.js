const express = require('express');
const { getBrands, createBrand, updateBrand } = require('../controllers/Brand');
const router = express.Router()
router.get('/', getBrands)
router.post("/brand", createBrand)
router.patch("/brand/:id", updateBrand)
module.exports = router; 