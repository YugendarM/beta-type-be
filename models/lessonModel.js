const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    lesson: {
        type: Number
    },
    content: {
        type: String
    }
}, {
    collection: "lesson"
})

module.exports = mongoose.model("lessons", lessonSchema)