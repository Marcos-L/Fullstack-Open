const jwt = require('jsonwebtoken')
const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglistModel')
const User = require('../models/usersModel')

// Router is set to /api/blog

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1 })
  return response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if (blog){
      return response.json(blog)
    }
    else{
      return response.status(404).json({error:'Blog Not Found'}).end()
    }
})

bloglistRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body
    const user = request.user

    if(!user){
      return response.status(401).json({error:'Login required!'})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes:body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.posts = user.posts.concat(result._id)
    await user.save()

    return response.status(201).json(result).end()
  }
  catch (error) {
    next(error)
  }
})

bloglistRouter.delete('/:id', async (request, response, next) => {
  try{
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (!blog){
      return response.status(404).json({ error: 'Blog Not Found' }).end()
      
    }
    if (blog.user.toString() === user._id.toString()){
      const post_index = user.posts.indexOf(blog._id)
      user.posts.splice(post_index,1)
      
      await blog.deleteOne()
      await user.save()
      return response.status(200).json(blog).end()
    }
    else{
      return response.status(401).json({error:'Unauthorized access'})
    }
  }
  catch (error){
    next(error)
  }
})

bloglistRouter.patch('/:id', async (request, response, next) => {
  try{
    const user = request.user

    if(!user){
      return response.status(401).json({ error:'Login Required!' }).end()
    }

    const newBlog = request.body
    const oldBlog = await Blog.findById(request.params.id)

    delete newBlog.id
      if (oldBlog){
        if (oldBlog.user.toString() === user._id.toString()){
          for (const [key, value] of Object.entries(newBlog)){
            oldBlog[key] = value
          }
          await oldBlog.save()
          return response.status(200).json(newBlog).end()
        }
        else if (newBlog.likes){
          oldBlog.likes = newBlog.likes
          await oldBlog.save()
          return response.status(200).json(newBlog).end()
        }
        else{
          return response.status(401).json({ error:'Unauthorized access' })
        }
      }
      else{
        return response.status(404).json({ error:'Blog Not Found' }).end()
      }
  }
  catch (error){
    next(error)
  }
})

module.exports = bloglistRouter