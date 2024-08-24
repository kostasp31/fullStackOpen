import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  CreateForm.PropTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      createBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception) {
      console.log('Submit failed')
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateForm