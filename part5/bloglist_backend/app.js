//Node Packages
const express = require('express')
const mongoose = require('mongoose')

//Project files
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/bloglistController')
const userRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
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
app.use(middleware.getUserToken)

//Set Routers
app.use('/api/blog', middleware.getUserFromToken, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


//Error Handlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//Export
module.exports = app