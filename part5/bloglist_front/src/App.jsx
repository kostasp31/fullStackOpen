import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [resort, setResort] = useState(0)

  const [message, setMessage] = useState('')

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)) //local
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      console.log('Login failed')

      setMessage('wrong username or password')
      clearTimeout()
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const createBlog = async (obj) => {
    const blog = await blogService.create(obj)
    setBlogs([...blogs, blog])
    createFormRef.current.toggleVisibility()

    setMessage(`a new blog "${obj.title}" by ${obj.author} added`)
    clearTimeout()
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const likePressed = async (id, obj) => {
    setResort(resort+1)

    let blog = blogs
    const objIndex = blog.findIndex(obj => obj.id === id)
    blog[objIndex].likes = obj.likes

    // console.log(blog)
    setBlogs(blog)

    const upd = await blogService.update(id, obj)
  }

  const deleteBlog = async (id) => {
    const resp = await blogService.del(id)
    const newBlogs = blogs.filter((bl) => { return bl.id !== id })
    setBlogs(newBlogs)
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Message msg={message} usr={user} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Message msg={message} usr={user} />

      <p>{user.name} is logged in the application
        <button onClick={logoutUser}>logout</button>
      </p>

      <Togglable buttonLabel='create' ref={createFormRef}>
        <CreateForm
          createBlog={createBlog}
        />
      </Togglable>

      <br />

      {blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={likePressed} del={deleteBlog} user={user} />
      )}
    </div>
  )

}

export default App