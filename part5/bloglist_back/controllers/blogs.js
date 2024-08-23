const blogsrouter = require('express').Router()
const Blog = require("../models/blog")
const jwtV = require('jsonwebtoken')

const User = require("../models/user")

blogsrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsrouter.post('/', async (request , response) => {
  // const randUser = await User.findOne()

  const decodedToken = jwtV.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid, did you provide it?' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })
 
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  
  response.status(201).json(newBlog)
})

blogsrouter.delete('/:id', async (request, response) => {
  const decodedToken = jwtV.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  // get the user of the token
  const user = await User.findById(decodedToken.id)
  if (!user)
    return response.status(401).json({ error: 'invalid token' })
  //get the blog to delete
  const blog = await Blog.findById(request.params.id)
  if (!blog)
    return response.status(401).json({ error: 'blog not found' })

  // check if the user that makes the delete request is the owner of the blog
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'no permission to delete this resource' })
  }

})

blogsrouter.put('/:id', async (request, response) => {
  const blog = request.body
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(newBlog)
})

module.exports = blogsrouter