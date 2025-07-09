import { useState } from 'react'
import services from '../services/blogServices'

const PostForm = ({ user, blogs, updateBlog, setStatus }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const handleTitle = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const handleNewPost = async (event) => {
    event.preventDefault()
    const new_post = {
      title:blogTitle,
      author:blogAuthor,
      url:blogUrl,
    }
    try{
      const post = await services.addToDB(new_post)
      const new_blog_list = blogs.concat(post)
      updateBlog(new_blog_list)
      const status = {
        message:`Post ${post.title} by ${post.author} was added successfully`,
        type:'success'
      }
      setStatus(status)
    }
    catch(exception){
      const status = {
        message:exception.response.data.error,
        type:'error'
      }
      setStatus(status)
    }
  }
  

  if (user){
    return(
      <form onSubmit={handleNewPost}>
        <div>
        <h2>Add New Blog</h2>
          Title: <input type='text' onChange={handleTitle}/><br></br>
          Author: <input type='text' onChange={handleAuthor}/><br></br>
          Url: <input type='text' onChange={handleUrl}/><br></br>
          <button type='submit'>Send</button>
        </div>
      </form>
    )
  }
  return null
}

export default PostForm