const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is mandotary field"]
    },
    email: {
        type: String,
        required: [true, "Email is mandotary field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is mandotary field"],
        select: false,
        max: 25
    },
    topSpeed: {
        type: Number
    },
    topAccuracy: {
        type: Number
    },
    betaScore: {
        type: Number
    }

},
{
    collection: "user",
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)