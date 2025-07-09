import services from "../services/blogServices";

const BlogList = ({ list, setBlogs, setStatus}) => {

  const removePost = async (id) => {
    try{
      const confirmation = confirm('Are you sure you want to delete this post?')
      if (confirmation){
        const post = await services.delFromDB(id)
        const new_list = list.filter(blog=>blog.id!==id)
        setBlogs(new_list)
        const status = {
          message:`Post ${post.title} by ${post.author} was deleted successfully`,
          type:'success'
        }
        setStatus(status)
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

  const bloglist = []
  list.forEach(blog => {
    bloglist.push(<li key={blog.id}><div>
      Title: {blog.title}<br></br>
      Author: {blog.author}<br></br>
      Likes: {blog.likes}<br></br>
      Url: <a href={blog.url}>{blog.url}</a><br></br>
      <button onClick={async ()=>{
        await removePost(blog.id)
      }}>Delete</button>
    </div></li>)
  })

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {bloglist}
      </ul>
    </div>
  )
}

export default BlogList