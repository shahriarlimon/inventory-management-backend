const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid name for this product"],
        trim: true,
        unique: true,
        minLength: [3, "Name must be atleast 3 characters long!"],
        maxLength: [100, "Name is too large"]
    },
     description: {
        type: String,
        required: true

    }, 
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "unit value cann't be {VALUE},must be kg/litre/pcs"
        }
    },
    imageUrls: [
        {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    if (!Array.isArray(value)) return false;
                    let isValid = false;
                    value.forEach(url => {
                        if (!validator.isURL) {
                            isValid = false;
                        }
                    })
                    return isValid;

                },
                message: "Please provide valid image url"
            }
        }
    ],
    category: { type: String, required: true },
    brand: {
        name: { type: String, required: true },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)