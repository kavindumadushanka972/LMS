const Courses = require('../models/courseModel');

// filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} // this.queryString = req.query 
        console.log(queryObj)
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        console.log({queryObj, queryStr})

        this.query.find(JSON.parse(queryStr))

        return this; // returning only filtering query
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            console.log(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')  // send latest courses by default
        }

        return this;
    }

    paginating(){

        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page -1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

const courseCtrl = {

    getCourses: async(req, res) => { // anyone can get courses
        try {
            console.log(req.query)
            const features = new APIfeatures(Courses.find(), req.query).filtering().sorting().paginating()
            const courses = await features.query

            res.json({
                status: 'success',
                result: courses.length,
                courses: courses            
            })
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
    },
    getCourselength: async(req, res) => { // get full number of courses
        try {
            const courses = await Courses.find()
            res.json(courses.length)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = courseCtrl