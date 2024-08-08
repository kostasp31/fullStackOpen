const config = require("./utils/config")
// const logger = require("./utils/logger")

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsrouter = require('./controllers/blogs')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsrouter)

module.exports = app