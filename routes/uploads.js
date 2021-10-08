const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authTeacher = require('../middleware/authTeacher')
const fs = require('fs')

// upload images, videos on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// upload image only Teacher can use
router.post('/uploadimage',auth, authTeacher, (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024*5){ // 5 MB
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'Image size is too large'})
        }
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'Incorrect file format'})
        }
            

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "LMS"}, async(err, result) => {
            if(err) throw err;
            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })

        // res.json("Test upload")
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// only Teacher can delete image
router.post('/distroyimage',auth, authTeacher, (req, res) => {
    try {
        const {public_id} = req.body
        if(!public_id) return res.status(400).json({msg: "No images selected."})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;
            res.json({msg: "Deleted"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// upload video only Teacher can use
router.post('/uploadvideo',auth, authTeacher, (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024*200){ // 200 MB
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'Video size is too large'})
        }
        if(file.mimetype !== 'video/mp4' && file.mimetype !== 'video/mpeg' && file.mimetype !== 'video/ogg' && file.mimetype !== 'video/quicktime' && file.mimetype !== 'video/webm' && file.mimetype !== 'video/x-m4v' && file.mimetype !== 'video/ms-asf' && file.mimetype !== 'video/x-msvideo'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'Incorrect file format'})
        }
            

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "LMS", resource_type: "video", chunk_size: 6000000}, (err, result) => {
            if(err) throw err;
            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// only Teacher can delete video
router.post('/distroyvideo',auth, authTeacher, (req, res) => {
    try {
        const {public_id} = req.body
        console.log({public_id})
        if(!public_id) return res.status(400).json({msg: "No videos selected."})

        cloudinary.v2.api.delete_resources(public_id, { resource_type: "video" }, async(err, result) => {
            if(err) throw err;
            console.log(result)
            res.json({msg: "Deleted"})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router
