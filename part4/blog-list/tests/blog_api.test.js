const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    helper.initialBlogs[0].title
  )
})

test('blogs contain an id property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Decent Blog',
    author: 'Decent Boi',
    url: 'http://localhost:3004/unrealurl',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const response = await helper.blogsInDb()
expect(response).toHaveLength(helper.initialBlogs.length + 1)

const titles = response.map(r => r.title)
expect(titles).toContain(
  newBlog.title
)
})

test('blogs without a likes property has 0 likes', async () => {
  const newBlog = {
    title: 'Actually Horrible Blog',
    author: 'Horrible Boi',
    url: 'http://localhost:6969/notnotunrealurl'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()
  
  const blog = response.filter(b => b.title === newBlog.title)[0]

  expect(blog.likes).toBe(0)
})

test('an invalid blog cannot be added', async () => {
  const invalidBlog = {
    author: 'Bad Boi'
  }

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})