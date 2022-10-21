const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');
const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLength: 100,
        unique: true,
        lowercase: true

    },
    description: {
        type: String,
       required:true
    }, 
    email: {
        type: String,
        validate: [validator.isURL, "Please provide a valid email"],
        lowercase: true

    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    location: String,
    products:[ {
        type: ObjectId,
        ref: "Product"
    }],
    suppliers: [
        {
            name: { type: String },
            contactNumber: { type: String },
            id: {
                type: ObjectId,
                ref: "Supplier"

            }

        }
    ],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})

module.exports= mongoose.model("Brand", brandSchema);
