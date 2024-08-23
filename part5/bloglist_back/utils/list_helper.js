const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0)
    return 0
  else
  return blogs.reduce((n, {likes}) => n + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {}
  const maxLikes = blogs.reduce((prev, current) => {
    return (prev && prev.likes > current.likes) ? prev : current
  })
  
  let obj = {...maxLikes}
  delete obj._id
  delete obj.__v
  delete obj.url
  return obj
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}
  const grouped = _.groupBy(blogs, blog => blog.author)
  let len = 0
  let author = ''
  for (let [key, value] of Object.entries(grouped)) {
    if (value.length > len) {
      len = value.length
      author = key
    }
  }

  ret = {}
  ret.author = author
  ret.blogs = len
  return ret
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}
  const grouped = _.groupBy(blogs, blog => blog.author)

  ret = {}
  for (let [key, value] of Object.entries(grouped)) {
    let sum = 0
    value.forEach(itm => sum += itm.likes)
    ret[key] = sum
  }

  let maxLikes = 0
  let maxAuth = ''

  for (let [key, value] of Object.entries(ret)) {
    if (value > maxLikes) {
      maxLikes = value
      maxAuth = key
    }
  }
  ret1 = {}
  ret1.author = maxAuth
  ret1.likes = maxLikes
  return ret1
}

const initBlogs = [
  {
    title: "You didn't find this, it found you!",
    author: "kostasP",
    url: "https://www.idk.com",
    likes: 128
  },
  {
    title: "How to use a pencil",
    author: "kostas",
    url: "https://www.xyz.com",
    likes: 32
  }
]

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initBlogs
}