const { sendError } = require("../helper/error");
const User = require("../models/User")

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) sendError(res, "Couln't create the user");
        res.status(200).json({ status: "success", message: "User successfully signed up" })

    } catch (error) {
        res.status(400).json({ status: "fail", error: "Couldn't get brand" })
    }
}