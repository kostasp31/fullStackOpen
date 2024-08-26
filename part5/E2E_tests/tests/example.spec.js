const { test, expect, beforeEach, describe } = require('@playwright/test')

const fillFormsCreate = async (page, title, author, url) => {
  // click create
  await page.getByRole('button', { name: 'create' }).click()
  const textboxes = await page.getByRole('textbox').all()
  
  // fill in a new blog
  await textboxes[0].fill(title)
  await textboxes[1].fill(author)
  await textboxes[2].fill(url)
  
  // create blog by clicking
  await page.getByRole('button', { name: 'Create' }).click()
}

const fillLogin = async (page, username, password) => {
  // fill in login form
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  // click 'login' button
  await page.getByRole('button', { name: 'login' }).click()
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'root rootakias',
        username: 'root',
        password: 'olympiakos'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const field1 = await page.getByRole('textbox').first()
    const field2 = await page.getByRole('textbox').last()
    const button = await page.getByRole('button', { name: 'login' })

    await expect(field1).toBeVisible()
    await expect(field2).toBeVisible()
    await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      fillLogin(page, 'root', 'olympiakos')
      
      await expect(page.getByText('root rootakias is logged in the application')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      test.slow()
      fillLogin(page, 'root', 'thrylos')
      
      await expect(page.getByText('root rootakias is logged in the application')).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // login as the only user
      fillLogin(page, 'root', 'olympiakos')
    })
    
    test('a new blog can be created', async ({ page }) => {
      fillFormsCreate(page, 'Test_title', 'Test_author', 'Test_url')

      // new blog is visible
      await expect(page.getByText('"Test_title", by Test_author')).toBeVisible()
      // message for addition was displayed
      await expect(page.getByText('a new blog "Test_title" by Test_author added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      test.slow()
      fillFormsCreate(page, 'Test_title', 'Test_author', 'Test_url')

      // click 'view' in the one and only blog
      await page.getByRole('button', { name: 'view' }).click()
      
      // blog has 0 likes
      await expect(page.getByText('likes:0')).toBeVisible()

      // click like button
      await page.getByRole('button', { name: 'like' }).click()

      // blog has 1 like now
      await expect(page.getByText('likes:1')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      // test.slow()
      fillFormsCreate(page, 'Test_title', 'Test_author', 'Test_url')
      
      // click 'view' in the one and only blog
      await page.getByRole('button', { name: 'view' }).click()
      
      // click 'remove' button, but first set accepting dialogs to true
      await page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Remove blog "Test_title" by Test_author ?')
        await dialog.accept()
      })

      // reload page for remove too appear
      await page.reload()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      
      // content of the blog should not be present
      await expect(page.getByText('"Test_title", by Test_author')).not.toBeVisible()
      
    })

    test('remove button is not visible to others', async ({ page, request }) => {
      fillFormsCreate(page, 'Test_title', 'Test_author', 'Test_url')
      await expect(page.getByText('"Test_title", by Test_author')).toBeVisible()
      
      // logout user
      await page.getByRole('button', { name: 'logout' }).click()
      // create new user
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Kostas Petrakis',
          username: 'kostas',
          password: 'olympiakos'
        }
      })
      await page.goto('http://localhost:5173')

      // login as the new user
      fillLogin(page, 'kostas', 'olympiakos')

      // click 'view' button
      await page.getByRole('button', { name: 'view' }).click()
      // remove button should not be visible
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      
    })

    test('blogs are arranged according to likes', async ({ page, request }) => {
      test.slow()
      fillFormsCreate(page, 'Test_title1', 'Test_author1', 'Test_url1')
      await expect(page.getByText('"Test_title1", by Test_author1')).toBeVisible()
      
      fillFormsCreate(page, 'Test_title2', 'Test_author2', 'Test_url2')
      await expect(page.getByText('"Test_title2", by Test_author2')).toBeVisible()
      
      // click both 'view' buttons
      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[0].click()
      await viewButtons[0].click()
      
      // get the 2 blogs
      const blog1 = page.locator('.blogClass').filter({ hasText: 'Test_title1' })
      const blog2 = page.locator('.blogClass').filter({ hasText: 'Test_title2' })

      // click like in the 2nd
      await blog2.getByRole('button', { name: 'like' }).click()
      
      expect(blog2).toContainText('likes:1')
      
      // not blog2 is displayed first
      expect(page.locator('.blogClass').first()).toContainText('Test_title2')
      expect(page.locator('.blogClass').last()).toContainText('Test_title1')
      
      // click two times like in blog1
      await blog1.getByRole('button', { name: 'like' }).click()
      await blog1.getByRole('button', { name: 'like' }).click()
      // now blog1 is the first
      expect(page.locator('.blogClass').first()).toContainText('Test_title1')
      expect(page.locator('.blogClass').last()).toContainText('Test_title2')
    })
  })
})