import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'

const blg = {
  title: "New blog (test)",
  author: "Kostasp31",
  url: "https",
  likes: 0,
  user: {
    username: "Mpampis"
  }
}

describe('blog components', async () => {
  let container 
  let mockLikes

  beforeEach(() => {
    mockLikes = vi.fn()
    let mockDel = vi.fn()
    container = render(<Blog blog={blg} like={mockLikes} del={mockDel} userName='Mpampis' />).container
  })

  test('renders title, author, not url and likes', () => {
    const cont = container.querySelector('#shortInfo')
    expect(cont).toHaveTextContent(`${blg.title}`)
    expect(cont).toHaveTextContent(`${blg.author}`)
    
    // expect url, likes prestnt in component
    const cont1 = container.querySelector('#longInfo')
    expect(cont1).toHaveTextContent(`${blg.url}`)
    expect(cont1).toHaveTextContent(`likes:${blg.likes}`)
    
    // div in whick component belongs is not visible
    const cont2 = container.querySelector('.moreInfo')
    expect(cont2).toHaveStyle('display: none')  

  })

  test('renders url, likes, after clicking view', async () => {
    const user = userEvent.setup()
    // find 'view' button, click it once
    const button = screen.getByText('view')
    await user.click(button)
    
    // after clicking url, likes must be visible
    const cont = container.querySelector('#longInfo')
    expect(cont).toHaveTextContent(`${blg.url}`)
    expect(cont).toHaveTextContent(`likes:${blg.likes}`)
    expect(cont).not.toHaveStyle('display: none')
  })

  test('clicking like twice calls the function 2 times', async () => {
    const user = userEvent.setup()
    // find 'view' button
    const viewButton = screen.getByText('view')
    // click it
    await user.click(viewButton)
    
    // find like button
    const likeButton = screen.getByText('like')
    // click it twice
    await user.click(likeButton)
    await user.click(likeButton)

    
    expect(mockLikes.mock.calls).toHaveLength(2)
  })
})

describe('new blog creation', async () => {
  test('Form calls the correct handler on submit with right details', async() => {
    const user = userEvent.setup()
    const mockCreate = vi.fn()
  
    const {container} = render(<CreateForm createBlog={mockCreate} />)

    // find all input boxes
    const input = screen.getAllByRole('textbox')
    // find submit button
    const submitButton = screen.getByText('Create')
  
    // fill in inputs
    await user.type(input[0], blg.title)
    await user.type(input[1], blg.author)
    await user.type(input[2], blg.url)
    // click submit
    await user.click(submitButton)
  
    expect(mockCreate.mock.calls[0][0]['title']).toBe(`${blg.title}`)
    expect(mockCreate.mock.calls[0][0]['author']).toBe(`${blg.author}`)
    expect(mockCreate.mock.calls[0][0]['url']).toBe(`${blg.url}`)
    expect(mockCreate.mock.calls).toHaveLength(1)
  })
})