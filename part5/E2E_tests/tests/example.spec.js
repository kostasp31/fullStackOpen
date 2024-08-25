const { test, expect, beforeEach, describe } = require('@playwright/test')

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

  test.skip('Login form is shown', async ({ page }) => {
    const field1 = await page.getByRole('textbox').first()
    const field2 = await page.getByRole('textbox').last()
    const button = await page.getByRole('button', { name: 'login' })

    await expect(field1).toBeVisible()
    await expect(field2).toBeVisible()
    await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test.skip('succeeds with correct credentials', async ({ page }) => {
      // fill in login form
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('olympiakos')
      // click 'login' button
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('root rootakias is logged in the application')).toBeVisible()
    })
    
    test.skip('fails with wrong credentials', async ({ page }) => {
      test.slow()
      // fill in login form with wrong credentials
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('thrylos')
      // click 'login' button
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('root rootakias is logged in the application')).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // login as the only user
      // fill in login form
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('olympiakos')
      // click 'login' button
      await page.getByRole('button', { name: 'login' }).click()
    })
    
    test.skip('a new blog can be created', async ({ page }) => {
      // click create
      await page.getByRole('button', { name: 'create' }).click()
      const textboxes = await page.getByRole('textbox').all()
      
      // fill in a new blog
      await textboxes[0].fill('Test_title')
      await textboxes[1].fill('Test_author')
      await textboxes[2].fill('Test_url')
      
      // create blog by clicking
      await page.getByRole('button', { name: 'Create' }).click()

      // new blog is visible
      await expect(page.getByText('"Test_title", by Test_author')).toBeVisible()
      // message for addition was displayed
      await expect(page.getByText('a new blog "Test_title" by Test_author added')).toBeVisible()
    })

    test.skip('a blog can be liked', async ({ page }) => {
      test.slow()
      // click create
      await page.getByRole('button', { name: 'create' }).click()
      const textboxes = await page.getByRole('textbox').all()
      
      // fill in a new blog
      await textboxes[0].fill('Test_title')
      await textboxes[1].fill('Test_author')
      await textboxes[2].fill('Test_url')
      
      // create blog by clicking
      await page.getByRole('button', { name: 'Create' }).click()
      

      // click 'view' in the one and only blog
      await page.getByRole('button', { name: 'view' }).click()
      
      // blog has 0 likes
      await expect(page.getByText('likes:0')).toBeVisible()

      // click like button
      await page.getByRole('button', { name: 'like' }).click()

      // blog has 1 like now
      await expect(page.getByText('likes:1')).toBeVisible()

      ////////////////////////////////
      // await page.waitForResponse(response => response.status() === 201, { timeout: 60000 })

      // const response = await page.goto('http://localhost:3003/api/blogs')
      // const resp = await response.json()

      // await expect(resp[0].likes).toBe(1)
    })

    test.skip('a blog can be deleted by its creator', async ({ page }) => {
      // test.slow()
      // click create
      await page.getByRole('button', { name: 'create' }).click()
      const textboxes = await page.getByRole('textbox').all()
      
      // fill in a new blog
      await textboxes[0].fill('Test_title')
      await textboxes[1].fill('Test_author')
      await textboxes[2].fill('Test_url')
      
      // create blog by clicking
      await page.getByRole('button', { name: 'Create' }).click()
      

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
      // test.slow()
      // click create
      await page.getByRole('button', { name: 'create' }).click()
      const textboxes = await page.getByRole('textbox').all()
      
      // fill in a new blog
      await textboxes[0].fill('Test_title')
      await textboxes[1].fill('Test_author')
      await textboxes[2].fill('Test_url')
      
      // create blog by clicking
      await page.getByRole('button', { name: 'Create' }).click()
      
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
      // fill in login form
      await page.getByRole('textbox').first().fill('kostas')
      await page.getByRole('textbox').last().fill('olympiakos')
      // click 'login' button
      await page.getByRole('button', { name: 'login' }).click()

      // click 'view' button
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      
    })
  })
})