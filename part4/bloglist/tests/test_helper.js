const Blog = require('../models/bloglistModel')

const getInvalidId = async () => {
    const dummy_post = {
        title: 'Dummy Post',
        author: 'Tom Sayer',
        url: 'This is totally a valid URL',
    }
    const blog = new Blog(dummy_post)
    await blog.save()
    await Blog.findByIdAndDelete(blog.id)

    return blog.id.toString()
}

module.exports = { getInvalidId }