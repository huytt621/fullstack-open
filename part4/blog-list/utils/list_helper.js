const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.map(b => b.likes).reduce((accumulator, currentVal) => accumulator + currentVal, 0)

const favoriteBlog = (blogs) => blogs.reduce((prev, curr) => prev.likes > curr.likes ? { title: prev.title, author: prev.author, likes: prev.likes} : { title: curr.title, author: curr.author, likes: curr.likes }, { title: 'None', author: 'None', likes: -1 })

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, b => b.author)
  return Object.keys(counts).reduce((prev, curr) => counts[prev] < counts[curr] ? { author: prev, blogs: counts[prev] } : { author: curr, blogs: counts[curr] }, { author: 'None',  blogs: -1 })
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, b => b.author)

  let mostLiked = Object.keys(authors)[0]
  let mostLikes = totalLikes(authors[mostLiked])

  Object.keys(authors).forEach(a => {
    const likes = totalLikes(authors[a])
    if (likes > mostLikes) {
      mostLiked = a
      mostLikes = likes
    }
  })

  return { author: mostLiked, likes: mostLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}