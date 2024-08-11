const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


const emptyList = []
const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  
  test('totalLikes in one blog', () => {
    const res = listHelper.totalLikes(oneBlog)
    assert.strictEqual(res, 5)
  })
  
  test('totalLikes in namy blogs', () => {
    const res = listHelper.totalLikes(manyBlogs)
    assert.strictEqual(res, 36)
  })

  test('totalLikes in empty list of blogs', () => {
    const res = listHelper.totalLikes(emptyList)
    assert.strictEqual(res, 0)
  })

})

describe('favourites', () => {
  test('favourite blog in list of one', () => {
    const res = listHelper.favoriteBlog(oneBlog)
    assert.deepStrictEqual(
      res,
      {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
      }
    )
  })

  test('favourite blog in list of many', () => {
    const res = listHelper.favoriteBlog(manyBlogs)
    assert.deepStrictEqual(
      res,
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )  
  })

  test('favourite blog in empty list', () => {
    const res = listHelper.favoriteBlog(emptyList)
    assert.deepStrictEqual(
      res,
      {}
    )  
  })
})

describe('most active author', () => {
  test('active author in list of many', () => {
    const res = listHelper.mostBlogs(manyBlogs)
    assert.deepStrictEqual(
      res,
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )  
  })

  test('active author in list of one', () => {
    const res = listHelper.mostBlogs(oneBlog)
    assert.deepStrictEqual(
      res,
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )  
  })

  test('active author in empty list', () => {
    const res = listHelper.mostBlogs(emptyList)
    assert.deepStrictEqual(
      res,
      {}
    )  
  })
})

describe('most popular author', () => {
  test('popular author in list of many', () => {
    const res = listHelper.mostLikes(manyBlogs)
    assert.deepStrictEqual(
      res,
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )      
  })

  test('popular author in list of one', () => {
    const res = listHelper.mostLikes(oneBlog)
    assert.deepStrictEqual(
      res,
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )      
  })

  test('popular author in empty list', () => {
    const res = listHelper.mostLikes(emptyList)
    assert.deepStrictEqual(
      res,
      {}
    )      
  })
})