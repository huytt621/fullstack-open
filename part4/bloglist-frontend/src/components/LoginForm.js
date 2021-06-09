import React from 'react'
import Notification from './Notification'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <h2>log in to application</h2>
    <Notification message={props.message} success={props.success} />
    <div>
      username
      <input 
      type="text"
      value={props.username}
      name="Username"
      onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input 
      type="password"
      value={props.password}
      name="Password"
      onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm