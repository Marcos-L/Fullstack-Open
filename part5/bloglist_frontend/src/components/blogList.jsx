import { useState } from 'react'
import Blog from './blog'

const BlogList = ({ list, setStatus }) => {
  const [sortType, setSort] = useState('')

  const bloglist = list.map(blog => {
    return <Blog key={blog.id} blog={blog} setStatus={setStatus}/>
  })

  const handleSort = (event) => {
    setSort(event.target.value)
  }

  const comparatorFunc = (a,b) => {
    if (sortType && sortType !== 'likes'){
      return (a.props.blog[sortType] >= b.props.blog[sortType])*2-1
    }
    else if (sortType){
      return b.props.blog[sortType] - a.props.blog[sortType]
    }
    else{
      return 1
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h3>Sorting Options</h3>
      <form onChange={handleSort}>
        <label><input name='Sort' value='likes' type="radio"/>Likes</label>
        <label><input name='Sort' value='title' type="radio"/>Title</label>
        <label><input name='Sort' value='author' type="radio"/>Author</label>
        <label><input name='Sort' value='' type="radio" defaultChecked={true}/>None</label>
      </form>
      <ul>
        {bloglist.sort(comparatorFunc)}
      </ul>
    </div>
  )
}

export default BlogList