const express = require('express');
const multer = require('multer');
const { getProducts, createProduct, fileUpload } = require('../controllers/Product');
const router = express.Router();
const uploader = require("../middlewares/uploader.js");
/* const uploader = multer({
    dest:"images/"
}) */

router.get('/', getProducts)
router.post("/product", createProduct);
router.post('/file-upload', uploader.single("image"), fileUpload)
module.exports = router;