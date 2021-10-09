const Videos = require('../models/videoModel')
const Courses = require('../models/courseModel')
const { findByIdAndDelete } = require('../models/videoModel')

const videoCtrl = {
    getVideos: async(req,res) => {
        try {
            const videos = await Videos.find({course_id: req.params.id})
            res.json(videos) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createVideo: async(req,res) => {
        try {
            const course_id = req.params.id
            const {title, description, link, public_id} = req.body

            const course = await Courses.findOne({_id: course_id, owner_id: req.user.id})
            if(!course) // only owner of the course can upload videos to the course
                return res.status(400).json({msg: "You don't have permission to add videos to this course"})
            
            if(!link) return res.status(500).json({msg: "There is no video to upload."})

            const newVideo = new Videos({
                title, description, link, public_id, course_id
            })

            await newVideo.save()
            res.json({msg: "Video has uploaded"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteVideo: async(req,res) => {
        try {
            await Videos.findByIdAndDelete({_id: req.params.id})
            res.json({msg: "Video has deleted successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateVideo: async(req,res) => {
        try {
            const video_id = req.params.id
            const {title, description, link, public_id} = req.body

            if(!link) return res.status(500).json({msg: "There is no video to update."})

            await Videos.findByIdAndUpdate({_id: video_id}, {title, description, link, public_id})

            res.json({msg: "Video has updated successfully"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = videoCtrl
