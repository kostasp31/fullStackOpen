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
  
  // try {
  //   const newBlog = await blog.save()
  //   response.status(201).json(newBlog)
  // }
  // catch(error) {
  //   next(error)
  // }
})

module.exports = blogsrouter