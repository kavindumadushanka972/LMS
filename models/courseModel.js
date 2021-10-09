const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    image_public_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    enrolled_number: {
        type: Number,
        default: 0
    }

},{
    timestamps: true
})

module.exports = mongoose.model("Courses", courseSchema)