import { useState, useEffect } from 'react'
import LoginForm from './components/loginForm'
import BlogList from './components/blogList'
import PostForm from './components/postForm'
import StatusMessage from './components/statusMessage'
import services from './services/blogServices'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [status, setStatus] = useState(null)
  
  useEffect(()=>{
    let timer = setInterval(()=>{
      setStatus(null)
      clearInterval(timer)
    }, 5000)
  }, [status])

  useEffect(()=>{
    services.getDB().then(db=>setBlogs(db))
  },[])

  useEffect(()=>{
    const userCookie = window.localStorage.getItem('blogListUserInformation')
    if (userCookie){
      const usr = JSON.parse(userCookie)
      setUser(usr)
      services.setToken(usr.token)
    }
  },[])

  return (
    <div>
      <h1>Blog List Application</h1>
      <StatusMessage status={status}/>
      <LoginForm user={user} setUser={setUser} setStatus={setStatus}/>
      <PostForm user={user} blogs={blogs} updateBlog={setBlogs} setStatus={setStatus}/>
      <BlogList list={blogs} setBlogs={setBlogs} setStatus={setStatus}/>
    </div>
  )
}

export default App
