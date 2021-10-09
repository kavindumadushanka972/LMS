const router = require('express').Router()
const videoCtrl = require('../controllers/videoCtrl')
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')

router.route('/videos/:id')
    .get(videoCtrl.getVideos) // get videos under specific COURSE ID
    .post(auth, authTeacher, videoCtrl.createVideo) // only teacher can create a video under specific COURSE ID
    .put(auth, authTeacher, videoCtrl.updateVideo) // only teacher can update a specific record of video (here 'id' is '_id' of VIDEO)
    .delete(auth, authTeacher, videoCtrl.deleteVideo) // only teacher can delete a specific record of a video (here 'id' is '_id' of VIDEO)

module.exports = router