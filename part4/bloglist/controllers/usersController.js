const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/usersModel')

// Router is set to /api/users

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('posts', {title:1, author:1, url:1})
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  
  if (User){
      response.json(user)
    }
    else{
      response.status(404).json({error:'Error 404: User not found'}).end()
    }
})

userRouter.post('/', async (request, response, next) => {
  try{
    const { username, name, password } = request.body //Our payload

    if (password.length<3){
      response.status(400).json({error:"Password must be at least 3 characters long"}).end()
    }
    else{
      const saltRounds = 1
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,
      })
      
      const result = await user.save()
      response.status(201).json(result)
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = userRouter