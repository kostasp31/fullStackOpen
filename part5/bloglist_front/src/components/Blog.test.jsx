import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  render(<Blog blog={blg} like={mockLikes} del={mockDel} userName='Mpampis' />)

  const titleAuth = screen.getByText(`"${blg.title}", by ${blg.author}`)
  expect(titleAuth).toBeDefined()

  const urlEl = screen.queryByText(`${blg.url}`)
  expect(urlEl).toBeNull()

  const likesEl = screen.queryByText(`likes`)
  expect(likesEl).toBeNull()
})