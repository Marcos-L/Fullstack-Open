const Blog = require('../models/bloglistModel')

const initialDatabase = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: '6865e4d38b57a82589cc3bc3',
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: '6865e4d38b57a82589cc3bc4',
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: '6865e4d38b57a82589cc3bc4',
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: '6865e4d38b57a82589cc3bc2',
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 12,
      user: '6865e4d38b57a82589cc3bc3',
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 13,
      user: '6865e4d38b57a82589cc3bc2',
      __v: 0
    }
  ]

const getInvalidId = async () => {
    const dummy_post = {
        title: 'Dummy Post',
        author: 'Tom Sayer',
        url: 'This is totally a valid URL',
        user: '6865e4d38b57a82589cc3bc2',
    }
    const blog = new Blog(dummy_post)
    await blog.save()
    await Blog.findByIdAndDelete(blog.id)

    return blog.id.toString()
}

module.exports = { getInvalidId, initialDatabase }