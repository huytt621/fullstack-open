import React, { useState } from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setMessage('wrong username or password')
      props.setSuccess(false)
      setTimeout(() => {
        props.setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={props.message} success={props.success} />
      <div>
        username
        <input 
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input 
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm