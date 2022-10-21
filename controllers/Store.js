const Store = require("../models/Store")

exports.getStore = async (req, res, next) => {
    try {
        const result = await Store.find({});
        res.status(200).json({ status: "success", message: "getting stores..." })

    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't get stores..." })
    }
}

exports.getStoreById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const store = await Store.findOne({ _id: id });
        res.status(200).json({ status: "success", data: store })

    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't get the store..." })

    }
}

exports.createStore = async (req, res, next) => {
    try {
        const result = await Store.create(req.body)
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message, message: "Couldn't create the store..." })
        
    }
}