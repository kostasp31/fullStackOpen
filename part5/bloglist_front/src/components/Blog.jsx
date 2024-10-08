import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, user, del }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    del: PropTypes.func.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : 'inline' }
  const showWhenVisible = { display: visible ? 'inline' : 'none' }

  const showIfOwner = {
    display: (blog.user.id === user.id) || (blog.user === user.id) ? '' : 'none',
    color: 'red',
    backgroundColor: 'white',
    borderRadius: '4px'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const likePressed = () => {
    const updBlog = {
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    like(blog.id, updBlog)
    setLikes(likes + 1)
  }

  const deleteB = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`))
      del(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogClass'>
      <p style={{ display: 'inline' }} id='shortInfo'>&quot;{blog.title}&quot;, by {blog.author}</p>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='moreInfo'>
        <button onClick={toggleVisibility}>hide</button>
        <div id='longInfo'>
          {blog.url}
          <br />
          likes:{likes}
          <button onClick={likePressed}>like</button>
          <br />
          {blog.user.username || user.username}
          <br />
          <button onClick={deleteB} style={showIfOwner}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog