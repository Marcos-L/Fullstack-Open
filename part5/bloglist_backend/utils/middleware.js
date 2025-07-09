/**
 * Original code from https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-1/utils/middleware.js
 */

const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  if (request.body){
    const body = JSON.parse(JSON.stringify(request.body))
    if ('password' in body){
      delete body.password
    }
    if ('passwordHash' in body){
      delete body.passwordHash
    }
    logger.info('Body:  ', body)
  }
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const getUserToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  else{request.token = null}
  
  next()
}

const getUserFromToken = async (request, response, next) => {
  if (request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' }).end()
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' }).end()
    }

    request.user = user
  }
  else{request.user=null}
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  getUserToken,
  getUserFromToken,
  unknownEndpoint,
  errorHandler,
}