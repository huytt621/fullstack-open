import React from 'react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import Notification from './Notification'

const BlogsDisplay = (props) => (
  <div>
    <h2>blogs</h2>
    <Notification message={props.message} success={props.success} />
    <div>
      { props.name } logged in
      <button onClick={props.handleLogout}>logout</button>
    </div>
    <br />
    <BlogsForm title={props.title} setTitle={props.setTitle} author={props.author} setAuthor={props.setAuthor} url={props.url} setUrl={props.setUrl} createBlog={props.createBlog} />
    <BlogsList blogs={props.blogs} />
  </div>
)

const BlogsList = ({ blogs }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogsDisplay