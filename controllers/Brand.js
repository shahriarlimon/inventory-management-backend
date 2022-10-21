const Brand = require("../models/Brand.js")
exports.createBrand = async (req, res, next) => {
    try {
        const result = await Brand.create(req.body);
        res.status(200).json({ status: "success", message: "creating brand to the database" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't create brand" })

    }
}
exports.getBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find({}).populate('products')
        res.status(200).json({ status: "success", data: brands, message: "getting brands" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get brand" })

    }
}

exports.getBrandsById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findOne({ _id: id }).select('-products -suppliers');
        if (!brand) sendError(res, "Couldn't get the brand");
        res.status(200).json({ status: "success", data: brand, message: "getting the brand successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get brand" })


    }
}

exports.updateBrand = async (req, res, next) => {
    const { id } = req.body;
    try {
        const result = await Brand.updateOne({ _id: id }, req.body, {
            runValidators: true
        })
        if (!result.nModifiedCount) sendError(res, "Couldn't update the brand with that id")
    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't update the band" })
    }
}