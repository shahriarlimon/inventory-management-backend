const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please provida a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowerCase: 3,
                    minNumbers: 1,
                    minUpperCase: 1,
                    minSymbols: 1
                }),
            message: "Password {VALUE} is not strong enough"
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Passwords don't match"
        }
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer"
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provie a valid phone number"]
    },
    shippingAddress: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"]
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date



}, {
    timestamps: true
});
userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next()

})
module.exports = mongoose.model("User", userSchema)