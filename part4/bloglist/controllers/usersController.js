const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/usersModel')

// Router is set to /api/users

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  
  if (User){
      response.json(user)
    }
    else{
      response.statusMessage = 'Error 404: User not found'
      response.status(404).end()
    }
})

userRouter.post('/', async (request, response, next) => {
  try{
    const {username, name, password} = response.body //Our payload

    const saltRounds = 1
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash
    })
    
    const result = await user.save()
    response.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = userRouter