import { useState } from "react"

const Blog = ({ blog, like, userName, del}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : 'inline' }
  const showWhenVisible = { display: visible ? 'inline' : 'none' }

  const showIfOwner = { 
    display: blog.user.username === userName ? '' : 'none',
    color: 'red',
    'background-color': 'white',
    'border-radius': '4px'
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
    setLikes(likes+1)
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
    <div style={blogStyle}>
      "{blog.title}", by {blog.author} 
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <div>
          {blog.url}
          <br />
          likes:{likes}
          <button onClick={likePressed}>like</button>
          <br />
          {blog.user.username || userName} 
          <br />
          <button onClick={deleteB} style={showIfOwner}>remove</button>
        </div>
      </div>
    </div>  
    )
  }

export default Blog