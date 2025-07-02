const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/bloglistModel')
const { getInvalidId } = require('./test_helper')

const api = supertest(app)

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Database supertests', () => {
  const initialDatabase = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 13,
      __v: 0
    }
  ]

  beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialDatabase)
    console.log('Db ready!')
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('GET request returns the correct code (200) and content-type (JSON)', async () => {
    await api.get('/api/blog')
      .expect(200)
      .expect('content-type', /application\/json/)
  })

  test ('The database is complete', async () => {
    const response = await api.get('/api/blog')
    assert.strictEqual(response.body.length, initialDatabase.length)
  })

  test('GET a single database entry works', async () => {
    const random_blog = Math.floor(Math.random()*initialDatabase.length)
    const response = await api.get(`/api/blog/${initialDatabase[random_blog]._id}`)
    assert.strictEqual(response.body.id, initialDatabase[random_blog]._id)
    assert.strictEqual(response.body.title, initialDatabase[random_blog].title)
    assert.strictEqual(response.body.author, initialDatabase[random_blog].author)
    assert.strictEqual(response.body.url, initialDatabase[random_blog].url)
    assert.strictEqual(response.body.likes, initialDatabase[random_blog].likes)
  })

  test('A valid blog is added', async () => {
    const new_blog = {
      title: 'Test Blog Post',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    }

    await api.post('/api/blog')
      .send(new_blog)
      .expect(201)
      .expect('content-type', /application\/json/)

    const response = await api.get('/api/blog')

    const contents = JSON.stringify(response.body)

    assert.strictEqual(response.body.length, initialDatabase.length+1)
    assert(contents.includes(`"title":"${new_blog.title}","author":"${new_blog.author}","url":"${new_blog.url}","likes":${new_blog.likes}`))
  })

  test('A blog without title/url is NOT added', async () => {
    const new_blog = {
      title: 'Test Blog Post',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    }

    const titleless_blog = new_blog
    const urlless_blog = new_blog

    delete titleless_blog.title
    delete urlless_blog.url

    await api.post('/api/blog')
      .send(titleless_blog)
      .expect(400)

    await api.post('/api/blog')
      .send(urlless_blog)
      .expect(400)

    const response = await api.get('/api/blog')

    const contents = JSON.stringify(response.body)

    assert.strictEqual(response.body.length, initialDatabase.length)
    assert(!contents.includes(`"title":"","author":"${new_blog.author}","url":"${new_blog.url}","likes":${new_blog.likes}`))
    assert(!contents.includes(`"title":"${new_blog.title}","author":"${new_blog.author}","url":"","likes":${new_blog.likes}`))
  })

  test('A blog without likes defaults to 0', async () => {
    const new_blog = {
      title: 'Test Blog Post',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    await api.post('/api/blog')
      .send(new_blog)
      .expect(201)
      .expect('content-type', /application\/json/)

    const response = await api.get('/api/blog')

    const contents = JSON.stringify(response.body)

    assert.strictEqual(response.body.length, initialDatabase.length+1)
    assert(contents.includes(`"title":"${new_blog.title}","author":"${new_blog.author}","url":"${new_blog.url}","likes":0`))
  })
  
  test('Delete of a blog works and returns that blog', async () => {
    const random_blog = Math.floor(Math.random()*initialDatabase.length)
    const blog_to_delete = initialDatabase[random_blog]
    await api.delete(`/api/blog/${blog_to_delete._id}`)

    const response = await api.get('/api/blog')
    const contents = JSON.stringify(response.body)
    
    assert.strictEqual(response.body.length, initialDatabase.length - 1)
    assert(!contents.includes(`"title":"${blog_to_delete.title}","author":"${blog_to_delete.author}","url":"${blog_to_delete.url}","likes":${blog_to_delete.likes}`))
  })

  test('Delete of an invalid id returns an error', async () => {
    const invalid_id = getInvalidId()
    await api.delete(`/api/blog/${invalid_id}`)
      .expect(400)
  })

  test('Modifying a missing blog return an error', async () => {
    const invalid_id = getInvalidId()
    await api.patch(`/api/blog/${invalid_id}`)
      .send({likes: 42})
      .expect(400)
  })

  test('Modifying a blog works and returns the new version of the blog', async () => {
    const random_blog = Math.floor(Math.random()*initialDatabase.length)
    const blog_to_mod = initialDatabase[random_blog]
    let likes = blog_to_mod.likes + 30

    await api.patch(`/api/blog/${blog_to_mod._id}`)
      .send({likes: likes})

    const response = await api.get(`/api/blog/${blog_to_mod._id}`)

    assert.strictEqual(response.body.likes, likes)
  })

})

describe('Total Likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Likes of one post its just that post', () => {
    const random_post = Math.floor(Math.random()*blogs.length)
    const total_likes = listHelper.totalLikes([blogs[random_post]])
    assert.strictEqual(total_likes, blogs[random_post].likes)
  })

  test('Likes of no posts is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('Likes of multiple posts must be that total', () => {
    const total_likes = listHelper.totalLikes(blogs)
    assert.strictEqual(total_likes, 36)
  })
})

describe('Favorite Post',() => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 13,
      __v: 0
    }
  ]

  test('Favorite of none is null', () => {
    assert.strictEqual(listHelper.mostLikes([]),null)
  })

  test('Favorite of one is that one', () => {
    const random_post = Math.floor(Math.random()*blogs.length)
    assert.deepStrictEqual(listHelper.mostLikes([blogs[random_post]]), blogs[random_post])
  })

  test('Favorite of tied is any of the two', () => {
    const tied_blogs = [blogs[2], blogs[4]]
    const blog_list = blogs.slice(0,-1)
    assert(tied_blogs.includes(listHelper.mostLikes(blog_list)))
  })

  test('Favorite of multiple is the one with most likes', () => {
    const best_blog = blogs[5]
    assert.deepStrictEqual(listHelper.mostLikes(blogs), best_blog)
  })
})

describe('Author with most blogs', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 13,
      __v: 0
    }
  ]

  test('Favorite of none is null', () => {
    assert.strictEqual(listHelper.favoriteAuthor([]), null)
  })

  test('Favorite of one is that one', () => {
    const random_post = Math.floor(Math.random()*blogs.length)
    const random_author = {
      author:blogs[random_post].author,
      blogs:1
    }
    assert.deepStrictEqual(listHelper.favoriteAuthor([blogs[random_post]]), random_author)
  })

  test('Favorite of tied is any of them', () => {
    const tied_authors = [
      JSON.stringify({
        author:'Edsger W. Dijkstra',
        blogs:2
      }),
      JSON.stringify({
        author:'Robert C. Martin',
        blogs:2
      })
    ]
    const favorite_author = listHelper.favoriteAuthor(blogs.slice(0,-1))
    assert(tied_authors.includes(JSON.stringify(favorite_author)))
  })

  test('Favorite of multiple is the one with most posts', () => {
    assert.deepStrictEqual(listHelper.favoriteAuthor(blogs), { author:'Robert C. Martin', blogs:3 })
  })
})

describe('Author with most likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 13,
      __v: 0
    }
  ]

  test('Most likes of none is null', () => {
    assert.strictEqual(listHelper.bestAuthor([]), null)
  })

  test('Most likes of one is that one', () => {
    const random_post = Math.floor(Math.random()*blogs.length)
    const random_author = {
      author:blogs[random_post].author,
      likes:blogs[random_post].likes
    }
    assert.deepStrictEqual(listHelper.bestAuthor([blogs[random_post]]), random_author)
  })

  test('Most liked of tied is any of them', () => {
    const tied_authors = [
      JSON.stringify({
        author:'Edsger W. Dijkstra',
        likes:17
      }),
      JSON.stringify({
        author:'Robert C. Martin',
        likes:17
      })
    ]
    const best_author = listHelper.bestAuthor(blogs.slice(0,-1))
    assert(tied_authors.includes(JSON.stringify(best_author)))
  })

  test('Most liked of multiple is the one with most total likes', () => {
    assert.deepStrictEqual(listHelper.bestAuthor(blogs), { author:'Robert C. Martin', likes:30 })
  })
})