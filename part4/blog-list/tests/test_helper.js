const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'The Best Blog',
    author: 'Best Boi',
    url: 'http://localhost:3003/fakeurl',
    likes: 29
  },
  {
    title: 'The Worst Blog',
    author: 'Worst Boi',
    url: 'http://localhost:3006/notrealurl',
    likes: 1
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}