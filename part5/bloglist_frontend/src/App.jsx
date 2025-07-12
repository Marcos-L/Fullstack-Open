import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/loginForm'
import BlogList from './components/blogList'
import PostForm from './components/postForm'
import StatusMessage from './components/statusMessage'
import Toggable from './components/toggable'

import services from './services/blogServices'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => { //Status Timer
    let timer = setInterval(() => {
      setStatus(null)
      clearInterval(timer)
    }, 5000)
  }, [status])

  useEffect(() => { //Get DB
    services.getDB().then(db => setBlogs(db))
  },[])

  useEffect(() => { // Get User Cookie if available
    const userCookie = window.localStorage.getItem('blogListUserInformation')
    if (userCookie){
      const usr = JSON.parse(userCookie)
      setUser(usr)
      services.setToken(usr.token)
    }
  },[])

  const postRef = useRef()

  return (
    <div>
      <h1>Blog List Application</h1>
      <StatusMessage status={status}/>
      { user ?
        <LoginForm user={user} setUser={setUser} setStatus={setStatus}/>
        :
        <Toggable name='Login'>
          <LoginForm user={user} setUser={setUser} setStatus={setStatus}/>
        </Toggable>
      }
      { user ?
        <Toggable name='Make a Post' ref={postRef}>
          <PostForm blogs={blogs} updateBlog={setBlogs} setStatus={setStatus} parent={postRef}/>
        </Toggable>
        : null
      }
      <BlogList list={blogs} setStatus={setStatus}/>
    </div>
  )
}

export default App
