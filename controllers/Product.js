const { sendError } = require("../helper/error")
const Product = require("../models/Product")
const Brand = require("../models/Brand");
;

exports.getProducts = async (req, res, next) => {
    try {
        const result = await Product.find({})
        res.status(200).json({ status: "success", data: result, message: "getting products" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get products" })
    }

}

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        const { _id: productId, brand } = product;
        const result = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
        console.log(result.nModified)
        res.status(200).json({ status: "success", data: product, message: "creating product to the database" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't create product" })
    }

}

exports.updateById = async (req, res, next) => {
    const { id } = req.params;
    if (!id) sendError(res, "couldn't get the id")
    try {
        const result = await Product.findOneAndUpdate(id, req.body, { runValidators: true })
        res.status(200).json({ status: "success", data: result, message: "creating product to the database" })
        res.send
    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't update the product" })
    }
}

exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json(req.file)
        console.log(req.file)
    } catch (error) {

    }
}