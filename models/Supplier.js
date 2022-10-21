const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name must have at least 3 characters!"],
        maxLength: [100, "Name is too large"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        trim: true,
        lowercase: true,
        unique: true

    },

    brand: {
        name: { type: String, required: true, trim: true },
        id: { type: ObjectId, required: true, ref: "Brand" },

    },
    contactNumber: {
        type: String,
        required: [true, "Please provide your contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            }
        },
        message: "Please provide a valid phone number"
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide an emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            }
        },
        message: "Please provide a valid  number"

    },
    tradeLicenseNumber: {
        type: Number,
        required: [true, "Please provide your trade license number"],

    },
    presentAddress: {
        type: Number,
        required: [true, "Please provide your present address"],

    },
    permanentAddress: {
        type: Number,
        required: [true, "Please provide your permanent address"],

    },
    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chottogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh  "],
            message: "{VALUE} is not a correct division"
        }
    },
    imageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }



}, { timestamps: true })

module.exports = mongoose.model("Supplier", supplierSchema)