const config = require("./utils/config")
const express = require('express')
const app = express()
require('express-async-errors')
// const logger = require("./utils/logger")
const cors = require('cors')

const blogsrouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsrouter)

app.use(middleware.errorHandler)

module.exports = app