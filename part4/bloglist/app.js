//Node Packages
const express = require('express')
const mongoose = require('mongoose')

//Project files
const config = require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/bloglistController')
const middleware = require('./utils/middleware')

//Backend object
const app = express()

//Connect to DB
mongoose.connect(mongoUrl)
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

//Set Router
app.use('/api/blog', notesRouter)

//Error Handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//Export
module.exports = app