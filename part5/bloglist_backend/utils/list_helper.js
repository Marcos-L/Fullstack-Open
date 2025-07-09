var lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const mostLikes = (blogs) => {
  if (blogs.length){
    var mostLiked = { likes: 0 }
    blogs.forEach(blog => {
      mostLiked = mostLiked.likes<=blog.likes ? blog : mostLiked
    })
    return mostLiked
  }
  else{ return null }
}

const favoriteAuthor = (blogs) => {
  if (blogs.length){
    var favorite_author = { author:'None', blogs:0 }
    const author_posts = lodash.countBy(blogs, 'author')
    for (const [key, value] of Object.entries(author_posts)) {
      favorite_author = favorite_author.blogs <= value ? { author:key, blogs:value } : favorite_author
    }
    return favorite_author
  }
  else{ return null }
}

const bestAuthor = (blogs) => {
  if (blogs.length){
    var likes = lodash.groupBy(blogs, 'author')
    for (const author in likes){
      likes[author] = lodash.sumBy(likes[author], 'likes')
    }
    var best_author = { author:'None', likes:0 }
    for (const [key, value] of Object.entries(likes)) {
      best_author = best_author.likes <= value ? { author:key, likes:value } : best_author
    }
    return best_author
  }
  else { return null }

}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favoriteAuthor,
  bestAuthor
}