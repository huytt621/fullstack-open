import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogsForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const createBlog = async event => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create({
        title, author, url, user: props.user._id
      })

      props.setBlogs(props.blogs.concat(blog))
      props.setMessage(`a new blog ${title} by ${author} added`)
      props.setSuccess(true)
      setTimeout(() => {
        props.setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      props.setMessage('Error')
      props.setSuccess(false)
      setTimeout(() => {
        props.setMessage(null)
      }, 5000)
    }
  }

  return (
    <Togglable buttonLabel="create new blog" hideButtonLabel="cancel" ref={blogFormRef}>
      <form onSubmit={createBlog}>
        <h2>create new</h2>
        <TextInput label={"title"} value={title} name={"Title"} onChange={(target) => setTitle(target.value)} />
        <TextInput label={"author"} value={author} name={"Author"} onChange={(target) => setAuthor(target.value)} />
        <TextInput label={"url"} value={url} name={"URL"} onChange={(target) => setUrl(target.value)} />
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

const TextInput = (props) => (
  <div>
    { props.label }
    <input 
    type="text"
    value={ props.value }
    name={ props.name }
    onChange={ props.onChange }
    />
  </div>
)

export default BlogsForm