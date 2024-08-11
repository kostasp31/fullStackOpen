const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blogsrouter = require('express').Router()
const Blog = require("../models/blog")

test('get /api/blogs', async () => {
  const resp = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(resp.body.length, 2)
})

test.only('id has correct naming', async () => {
  const resp = await api
    .get('/api/blogs')

  Object.hasOwn(resp.body, 'prop')  <----------------- FIX THIS
  assert.strictEqual(1, 1)
})

after(async () => {
  await mongoose.connection.close()
})