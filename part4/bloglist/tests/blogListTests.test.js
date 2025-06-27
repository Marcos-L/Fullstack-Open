const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
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