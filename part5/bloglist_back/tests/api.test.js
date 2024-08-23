const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const help_func = require('../utils/list_helper')

let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  // await Blog.insertMany(help_func.initBlogs)

  const usr = {
    "username": "root",
    "name": "Superuser",
    "password": "olympiakos"
  }
  
  const log = {
    "username": "root",
    "password": "olympiakos"
  }

  const resp = await api
    .post('/api/users')
    .send(usr)
    .expect(201)

  const resp1 = await api
    .post('/api/login')
    .send(log)
    .expect(200)

  token = resp1.body.token

  await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(help_func.initBlogs[0])

  await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(help_func.initBlogs[1])
})

describe('GET BLOGS', () => {
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

describe('POST BLOGS', () => {
  test('post /api/blogs', async () => {
    const blogToPost = {
      "title": "Writing a supertest",
      "author": "kostasP",
      "url": "https://www.super.com",
      "likes": 12
    }
    
    const resp = await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
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
    .set({ Authorization: `Bearer ${token}` })
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
    .set({ Authorization: `Bearer ${token}` })
    .send(blogToPost1)
    .expect(400)
    
    const resp2 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(blogToPost2)
    .expect(400)
  })

  test('no token provided fails', async () => {
    const blogToPost1 = {
      "author": "Pouthenas",
      "url": "https://www.missingTitle.com",
    }
  
    await api
      .post('/api/blogs')
      .send(blogToPost1)
      .expect(401)
  })
})
  
describe('DELETE BLOGS', () => {
  test('deletion of existing blog', async () => {
    const resp = await api.get('/api/blogs')
    
    const toDel = resp.body[0]
    await api
    .delete(`/api/blogs/${toDel.id}`)
    .set({ Authorization: `Bearer ${token}` })
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
      .set({ Authorization: `Bearer ${token}` })
      .expect(401)
  })

  test('deletion of non existing blog, wrong id format', async () => {
    await api
      .delete(`/api/blogs/45`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
  })
})

describe('UPDATE BLOGS', () => {
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

describe('POST USERS', () => {
  test('user creation', async () => {
    const usr = {
      username: "Takis",
      name: "Takis Tatakis",
      password: "hfurwgfg874"      
    }

    await api
      .post('/api/users')
      .send(usr)
      .expect(201)  

    const resp = await api
      .get('/api/users')
      .expect(200)  

    assert.strictEqual(resp.body.some(us => {
      return (
        us.username === usr.username &&
        us.name === usr.name
      )
    }), true)

  })

  test('user with short username', async () => {
    const usr = {
      username: "Ko",
      name: "Koats",
      password: "fheuihf"
    }

    const resp = await api
      .post('/api/users')
      .send(usr)
      .expect(400)

    // console.log(resp.body.error)
    assert.strictEqual((resp.body.error).includes("shorter than the minimum allowed length (3)"), true)
  })

  test('user with short password', async () => {
    const usr = {
      username: "KoStis",
      name: "Koats",
      password: "12"
    }

    const resp = await api
      .post('/api/users')
      .send(usr)
      .expect(400)

    // console.log(resp.body.error)
    assert.strictEqual((resp.body.error).includes("Password should be at least 3 characters long"), true)
  })

  test('duplicate users', async () => {
    const usr1 = {
      username: "user1",
      name: "mpampis",
      password: "572653"
    }    

    const usr2 = {
      username: "user1",
      name: "takis",
      password: "wuifewtg4gv"
    }  
    
    await api
      .post('/api/users')
      .send(usr1)
      .expect(201)    

    const resp = await api
      .post('/api/users')
      .send(usr2)
      .expect(400)

    assert.strictEqual((resp.body.error).includes("username must be unique"), true)
    
  })
})

after(async () => {
  await mongoose.connection.close()
})