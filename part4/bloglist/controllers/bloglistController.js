const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglistModel')

// Router is set to /api/blog

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if (blog){
      response.json(blog)
    }
    else{
      response.statusMessage = 'Error 404: Blog not found'
      response.status(404).end()
    }
})

bloglistRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try{
    const result = await blog.save()
    response.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

bloglistRouter.delete('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(200).json(blog).end()
  }
  catch (error){
    next(error)
  }
})

bloglistRouter.patch('/:id', async (request, response, next) => {
  try{
    const newBlog = request.body
    const oldBlog = await Blog.findById(request.params.id)

    delete newBlog.id

    if (oldBlog){
      for (const [key, value] of Object.entries(newBlog)){
        oldBlog[key] = value
      }
      await oldBlog.save()
      response.status(200).json(newBlog).end()
    }
    else{
      response.statusMessage = 'Error 404: Blog not found'
      response.status(404).end()
    }
  }
  catch (error){
    next(error)
  }
})

module.exports = bloglistRouter