const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const help_func = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(help_func.initBlogs)
})

describe('GET', () => {
  test('get /api/blogs', async () => {
    const resp = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(resp.body.length, 2)
  })

  test('id has correct naming', async () => {
    const resp = await api
      .get('/api/blogs')

    if (resp.body.length === 0) {
      assert.strictEqual(true, true)
      return
    }
    
    assert.strictEqual(Object.hasOwn(resp.body[0], 'id'), true)
    assert.strictEqual(Object.hasOwn(resp.body[0], '_id'), false)
  })
})

describe('POST', () => {
  test('post /api/blogs', async () => {
    const blogToPost = {
      "title": "Writing a supertest",
      "author": "kostasP",
      "url": "https://www.super.com",
      "likes": 12
    }
    
    const resp = await api
    .post('/api/blogs')
    .send(blogToPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    // also get blogs to find the one just sent
    const resp1 = await api.get('/api/blogs')
    assert.strictEqual(resp1.body.length, help_func.initBlogs.length + 1)
    
    // console.log(resp1.body)
    
    assert(resp1.body.some(obj => {
      return (
        obj.title === "Writing a supertest" &&
        obj.author === "kostasP" &&
        obj.url === "https://www.super.com" &&
        obj.likes === 12
      )
    }), true)
  })
  
  test('like property exists', async () => {
    const blogToPost = {
      "title": "I got no likes",
      "author": "Petros K",
      "url": "https://www.noLikes.com",
    }
    
    const resp = await api
    .post('/api/blogs')
    .send(blogToPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    // also get blogs to find the one just sent
    const resp1 = await api.get('/api/blogs')
    
    // console.log(resp1.body)
    
    assert(resp1.body.some(obj => {
      return (
        obj.title === "I got no likes" &&
        obj.author === "Petros K" &&
        obj.url === "https://www.noLikes.com" &&
        obj.likes === 0
      )
    }), true)
  })
  
  test('url or title missing', async () => {
    const blogToPost1 = {
      "author": "Pouthenas",
      "url": "https://www.missingTitle.com",
    }
    
    const blogToPost2 = {
      title: "Yeah no url here",
      "author": "Tipotas"
    }
    
    const resp1 = await api
    .post('/api/blogs')
    .send(blogToPost1)
    .expect(400)
    
    const resp2 = await api
    .post('/api/blogs')
    .send(blogToPost2)
    .expect(400)
  })
})
  
describe('DELETE', () => {
  test('deletion of existing blog', async () => {
    const resp = await api.get('/api/blogs')
    
    const toDel = resp.body[0]
    await api
    .delete(`/api/blogs/${toDel.id}`)
    .expect(204)
    
    const resp1 = await api.get('/api/blogs')
    // one less blog
    assert.strictEqual(resp1.body.length , help_func.initBlogs.length - 1)

    // the right blog was removed
    assert.strictEqual(resp1.body.some(obj => {
      return (
        obj.title === toDel.title &&
        obj.author === toDel.author &&
        obj.url === toDel.url &&
        obj.likes === toDel.likes
      )
    }), false)

  })

  test('deletion of non existing blog, right id format', async () => {
    await api
      .delete(`/api/blogs/69ba154301f29ae5b643342b`)
      .expect(204)
  })

  test('deletion of non existing blog, wrong id format', async () => {
    await api
      .delete(`/api/blogs/45`)
      .expect(400)
  })
})

describe('UPDATE', () => {
  test('update number of likes in first blog', async () => {
    const resp0 = await api.get('/api/blogs')
    const blog0 = resp0.body[0]

    const updatedblog = {
      title: blog0.title,
      author: blog0.author,
      url: blog0.url,
      likes: blog0.likes + 1
    }

    await api
      .put(`/api/blogs/${blog0.id}`)
      .send(updatedblog)
      .expect(204)

    const resp1 = await api.get('/api/blogs')
    const blog1 = resp1.body[0]

    assert.strictEqual(blog1.likes, blog0.likes + 1)
    assert.strictEqual(blog1.author, blog0.author)
    assert.strictEqual(blog1.title, blog0.title)
    assert.strictEqual(blog1.url, blog0.url)
  })
})

after(async () => {
  await mongoose.connection.close()
})