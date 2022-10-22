const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');
const Product = require("./Product")
//schema design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a valid name for this product"],
        trim: true,
       /*  unique: true, */
        minLength: [3, "Name must be at least 3 characters."],
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
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) return false;
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL) {
                        isValid = false;
                    }
                })
                return isValid;
            },
            message: "Please provide valid image url"
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Product price cannot be negative"]

    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity cannot be negative"]

    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: { type: String, required: true },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status cannot be {VALUE}"
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            lowercase: true,
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        },


    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],

        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Supplier"
        },
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0
    }


    /*  supplier: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Supplier"
     },
     catagories: [{
       name: {
         type: String,
         required: true
       },
       _id: mongoose.Schema.Types.ObjectId
   
     }] */

}, {
    timestamps: true
});
stockSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.status = 'out-of-stock'
    }
    next()
})
module.exports = mongoose.model("Stock", stockSchema)