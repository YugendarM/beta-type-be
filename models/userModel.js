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
        type: Number,
        default: 0
    },
    topAccuracy: {
        type: Number,
        default: 0
    },
    betaScore: {
        type: Number,
        default: 0
    },
    testResults: [{
        speed: {
            type:Number
        },
        accuracy: {
            type: Number
        },
        dateTime: {
            type: Date
        }
    }],
    educationOverview: [{
        lesson: {
            type: Number
        },
        accuracy: {
            type: Number
        }
    }],
    lessonsCompleted: {
        type: Number,
        default: 0
    }
},
{
    collection: "user",
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)