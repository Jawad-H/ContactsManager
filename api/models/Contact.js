const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true, },
        lastname: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        number: { type: String, required: true, unique: true },
        username: { type: String, required: true, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);