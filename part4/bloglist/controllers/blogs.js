const blogsrouter = require('express').Router()
const Blog = require("../models/blog")

blogsrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsrouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
 
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsrouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsrouter.put('/:id', async (request, response) => {
  const blog = request.body
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(newBlog)
})

module.exports = blogsrouter