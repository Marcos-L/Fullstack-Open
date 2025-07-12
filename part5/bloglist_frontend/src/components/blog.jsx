import { useState } from 'react'
import services from '../services/blogServices'

const Blog = ({ blog, setStatus }) => {
  const [state, setState] = useState(true)
  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const removePost = async (id) => {
    try{
      const confirmation = confirm('Are you sure you want to delete this post?')
      if (confirmation){
        const post = await services.delFromDB(id)
        const status = {
          message:`Post ${post.title} by ${post.author} was deleted successfully`,
          type:'success'
        }
        setStatus(status)
        setState(false)
      }
    }
    catch (exception){
      const status = {
        message:exception.response.data.error,
        type:'error'
      }
      setStatus(status)
    }
  }

  const addLike = () => {
    try {
      services.patchDb(blog.id, { likes:likes+1 })
      setLikes(likes+1)
    }
    catch (exception) {
      const status = {
        message:exception.response.data.error,
        type:'error'
      }
      setStatus(status)
    }
  }

  if (state){
    return(
      <li className="blog-item">
        {blog.title} by {blog.author}&nbsp;&nbsp;
        <button onClick={() => setDetails(!details)}>{details?'Hide':'Show'}</button>
        {details?
          <div>
            Likes: {likes}&nbsp;&nbsp;<button onClick={addLike}>Like</button><br></br>
            Url: <a href={blog.url}>{blog.url}</a><br></br>
            Posted by: {blog.user.name}<br/>
            <button onClick={async () => {
              await removePost(blog.id)
            }}>Delete</button>
          </div>
          :
          null
        }

      </li>
    )
  }
  else{return null}
}

export default Blog