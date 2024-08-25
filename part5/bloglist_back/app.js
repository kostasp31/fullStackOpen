const config = require("./utils/config")
const express = require('express')
const app = express()
require('express-async-errors')
// const logger = require("./utils/logger")
const cors = require('cors')

const blogsrouter = require('./controllers/blogs')
const usersrouter = require('./controllers/users')
const loginrouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsrouter)
app.use('/api/users', usersrouter)
app.use('/api/login', loginrouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app