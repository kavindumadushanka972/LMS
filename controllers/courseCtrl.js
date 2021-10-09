const Courses = require('../models/courseModel')

const courseCtrl = {

    getCourses: async(req, res) => { // anyone can get courses
        try {
            const courses = await Courses.find()
            res.json(courses)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCourse: async(req, res) => { // only teacher can
        try {
            const {title, description, owner_id, image_public_id, image_url, category} = req.body

            if(!image_url) return res.status(500).json({msg: "You must upload an image."})

            const newCourse = new Courses({
                title: title.toLowerCase(), description, owner_id, image_public_id, image_url, category
            })

            await newCourse.save()
            res.json({msg: "Course Created"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCourse: async(req, res) => { // teacher or admin can
        try {
            await Courses.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted course"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCourse: async(req, res) => { // only teacher can
        try {
            const {title, description, owner_id, image_public_id, image_url, category} = req.body

            if(!image_url) return res.status(500).json({msg: "You must upload an image."})

            await Courses.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), description, owner_id, image_public_id, image_url, category
            })

            res.json({msg: "Updated the course"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCourse: async(req, res) => { // anyone can
        try {
            const course = await Courses.findById(req.params.id)

            if(!course) 
                return res.status(400).json({msg: "This course is not available now"})
            
            res.json(course)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getMyCourses: async(req, res) => { // anyone can
        try {
            const courses = await Courses.find({owner_id: req.params.teacer_id})
            res.json(courses)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = courseCtrl