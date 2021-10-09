const router = require('express').Router()
const courseCtrl = require('../controllers/courseCtrl')
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const authAdminTeacher = require('../middleware/authAdminTeacher')

router.route('/courses')
    .get(courseCtrl.getCourses) // anyone can see courses
    .post(auth, authTeacher, courseCtrl.createCourse) // only teacher can create a course

router.route('/courses/:id')
    .get(courseCtrl.getCourse) // anyone can see course by course id
    .delete(auth, authAdminTeacher, courseCtrl.deleteCourse) // teacher or admin can delete a course
    .put(auth, authTeacher, courseCtrl.updateCourse) // only teacher can update a course

router.route('/mycourses/:teacer_id')
    .get(auth, authTeacher, courseCtrl.getMyCourses) // only teacher can see his/her own courses

router.route('/courses_length')
    .get(courseCtrl.getCourselength) // anyone can see number of courses
    

module.exports = router
