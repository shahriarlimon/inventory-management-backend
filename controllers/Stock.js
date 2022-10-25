const { sendError } = require('../helper/error');
const Stock = require('../models/Stock.js')

exports.getStock = async (req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);
        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterString);
        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.sort.split(',').join(' ');
            queries.fields = fields;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }
        const stocks = await Stock.find(filters).skip(queries.skip).limit(queries.limit).select(queries.field).sort(queries.sortBy);
        const total = await Stock.countDocuments(filters);
        const page = Math.ceil(total / queries.limit);
        res.status(200).JSON({ status: 'success', data: { total, page, stocks } });

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get products" })

    }
}

exports.getStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findOne({ _id: id })
        if (!stock) sendError(res, "Couldn't get the stock with is id");
        res.status(200).JSON({ status: 'success', data: stock}).populate("store.id").populate("brand.id").populate("suppliedBy.id")

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get the stock by this is" })
    }
}

exports.createStock = async (req, res, next) => {
    try {
        const result = await Brand.create(req.body);
        res.status(200).json({ status: "success", result, message: "creating stock to the database successfully" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't create brand" })

    }
}