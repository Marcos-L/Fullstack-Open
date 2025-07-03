//Node Packages
const express = require('express')
const mongoose = require('mongoose')

//Project files
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/bloglistController')
const userRouter = require('./controllers/usersController')
const middleware = require('./utils/middleware')

//Backend object
const app = express()

//Connect to DB
mongoose.connect(config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connection Successful')
  })
  .catch((error) => {
    logger.error('Connection Failed:', error.message)
  })

//Middleware
app.use(express.json())
app.use(middleware.requestLogger)

//Set Routers
app.use('/api/blog', blogsRouter)
app.use('/api/users', userRouter)

//Error Handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//Export
module.exports = app