const mongoose = require("../configuration/dbcongif");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
    resetpass: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("User", userSchema);
