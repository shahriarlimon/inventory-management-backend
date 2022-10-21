const Category = require("../models/Category");
exports.getCategory = async (req, res, next) => {
    try {
        const result = await Category.find({});
        res.status(200).json({ status: "success", message: "getting categories..." })

    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't get category..." })

    }
}
exports.getStoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ _id: id });
        res.status(200).json({ status: "success", data: category })

    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't get the category..." })

    }
}

exports.createCategory = async (req, res, next) => {
    try {
        const result = await Store.create(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't create the category..." })
        
    }
}