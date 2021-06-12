import React, { useState, useEffect } from 'react'
import BlogsDisplay from './components/BlogsDisplay'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  return (
    <div>
      { user ? 
      <BlogsDisplay user={user} setUser={setUser} message={message} success={success} name={user.name} handleLogout/> :
      <LoginForm setUser={setUser} message={message} setMessage={setMessage} success={success} setSuccess={setSuccess} /> }
    </div>
  )

}

export default App