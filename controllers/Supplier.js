const Supplier = require("../models/Supplier")

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({}).populate('products')
        res.status(200).json({ status: "success", data: suppliers, message: "getting suppliers" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get suppliers" })

    }
}

exports.createSuppliers = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(200).json({ status: "success", data: supplier, message: "creating supplier to the database" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't create supplier" })

    }
}

exports.getSupplierById = async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findOne({ _id: id }).select('-products -suppliers');
        if (!supplier) sendError(res, "Couldn't get the supplier");
        res.status(200).json({ status: "success", data: supplier, message: "getting the brand successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get the suppliers..." })


    }
}

exports.updateSupplier = async (req, res, next) => {
    const { id } = req.body;
    try {
        const result = await Supplier.updateOne({ _id: id }, req.body, {
            runValidators: true
        })
        if (!result.nModifiedCount) sendError(res, "Couldn't update the supplier with that id")
    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't update the supplier" })
    }
}