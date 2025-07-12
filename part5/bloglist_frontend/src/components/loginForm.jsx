import { useState } from 'react'
import services from '../services/blogServices'

const LoginForm = ({ user, setUser, setStatus }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    //login
    try{
      const user = await services.loginUser({ username:username, password:password })
      setUser(user)
      services.setToken(user.token)
      window.localStorage.setItem(
        'blogListUserInformation', JSON.stringify(user)
      )
      const status = {
        message:'Logged in successfully',
        type:'success'
      }
      setStatus(status)
    }
    catch (exception){
      const status = {
        message:exception.response.data.error,
        type:'error'
      }
      setStatus(status)
    }
  }

  if (user){
    return (
      <div>
        <h2>Hello {user.name}</h2>
        <button onClick={() => {
          setUser(null)
          services.setToken(null)
          setUsername('')
          setPassword('')
          window.localStorage.removeItem('blogListUserInformation')
          setStatus(null)
        }}>Logout</button>
      </div>
    )
  }
  return(
    <form onSubmit={handleLogin}>
      <div className='login-form'>
        <h2>Login</h2>
        username: <input onChange={handleUsernameChange}/><br />
        password: <input type="password" onChange={handlePasswordChange}/><br />
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm