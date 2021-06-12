import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
      </div>
      <Togglable buttonLabel={'view'} hideButtonLabel={'hide'}>
        <BlogContent blogs={blogs} blog={blog} setBlogs={setBlogs} />
      </Togglable>
    </div>
  )
}

const BlogContent = ({blogs, blog, setBlogs}) => {
  const addLike = async event => {
    event.preventDefault()
    const newBlog = blogService.put(blog.id, {...blog, likes: blog.likes + 1})
    setBlogs(blogs.map(blog => blog.id != newBlog.id ? blog : newBlog))
  }

  return (
    <div>
      <div>{blog.url}</div>
      <div>
        <div style={ {display: "inline-block"} }>likes {blog.likes}</div>
        <button style={ {display: "inline-block"} } onClick={addLike} >like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
}

export default Blog