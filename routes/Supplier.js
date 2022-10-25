const express = require('express');
const { getSuppliers, createSuppliers, getSupplierById, updateSupplier } = require('../controllers/Supplier');
const router = express.Router()
router.get('/', getSuppliers)
router.post("/", createSuppliers)
router.put('/supplier/:id', updateSupplier)
router.get("/supplier/:id", getSupplierById)

module.exports = router;