const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({

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
    course_id: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Videos", videoSchema)