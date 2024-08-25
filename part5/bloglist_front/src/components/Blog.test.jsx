import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title, author, not url and likes', () => {
  const blg = {
    title: "New blog (test)",
    author: "Kostasp31",
    url: "https",
    likes: 0,
    user: {
      username: "Mpampis"
    }
  }

  let mockLikes = vi.fn()
  let mockDel = vi.fn()

  const {container} = render(<Blog blog={blg} like={mockLikes} del={mockDel} userName='Mpampis' />)

  const cont = container.querySelector('.blogClass')
  expect(cont).toHaveTextContent(`${blg.title}`)
  expect(cont).toBeInTheDocument(`${blg.author}`)
  
  const cont1 = container.querySelector('.moreInfo')
  expect(cont1).toHaveTextContent(`${blg.url}`)
  expect(cont1).toBeInTheDocument("likes")
  expect(cont1).toHaveStyle('display: none')  

})