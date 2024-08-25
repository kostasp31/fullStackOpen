import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('existance of text in component', async () => {
  let container 

  const blg = {
    title: "New blog (test)",
    author: "Kostasp31",
    url: "https",
    likes: 0,
    user: {
      username: "Mpampis"
    }
  }

  beforeEach(() => {
    let mockLikes = vi.fn()
    let mockDel = vi.fn()
    container = render(<Blog blog={blg} like={mockLikes} del={mockDel} userName='Mpampis' />).container
  })

  test('renders title, author, not url and likes', () => {
    const cont = container.querySelector('#shortInfo')
    expect(cont).toHaveTextContent(`${blg.title}`)
    expect(cont).toBeInTheDocument(`${blg.author}`)
    
    const cont1 = container.querySelector('.moreInfo')
    expect(cont1).toHaveTextContent(`${blg.url}`)
    expect(cont1).toBeInTheDocument(`likes: ${blg.likes}`)
    expect(cont1).toHaveStyle('display: none')  
    
  })

  test('renders url, likes, after clicking view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    const cont = container.querySelector('.moreInfo')
    expect(cont).toHaveTextContent(`${blg.url}`)
    expect(cont).toBeInTheDocument(`likes: ${blg.likes}`)
    expect(cont).not.toHaveStyle('display: none')
  })

  test('clicking like twice call the function 2 times', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    
    
  })
})