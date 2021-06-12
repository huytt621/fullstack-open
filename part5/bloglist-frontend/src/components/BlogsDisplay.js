import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogsDisplay = (props) => {
  const [blogs, setBlogs] = useState([])
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [ props.user ])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    props.setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={props.message} success={props.success} />
      <div>
        { props.name } logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <BlogsForm user={props.user} blogs={blogs} setBlogs={setBlogs} />
      <BlogsList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

const BlogsList = ({ blogs, setBlogs }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blogs={blogs} setBlogs={setBlogs} blog={blog} />
    )}
  </div>
)

export default BlogsDisplay