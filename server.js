require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

// add cors with localhost 8081
const corsConfig = {
    credentials: true,
    origin: 'http://localhost:8081',
};

app.use(cors(corsConfig))
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/api/user', require('./routes/userRouter'))    // change /user to /api/user
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/uploads'))
app.use('/api', require('./routes/courseRouter'))
app.use('/api', require('./routes/videoRouter'))

// production
app.use(express.static(__dirname + '/public'))
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, 
    err => {
        if(err) throw err;
        console.log('Connected to MongoDB')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})