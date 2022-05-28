const puppeteer = require('puppeteer')

test('should login successfully', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test');
  await page.type('#password', 'test');
  await page.click('.login-button')

  const firstname = await page.$$eval('.user-firstname', messages => {
    return messages.map(option => option.textContent)
  })

  const lastname = await page.$$eval('.user-lastname', messages => {
    return messages.map(option => option.textContent)
  })

  await browser.close()
  expect(firstname.concat(lastname) == ['me', 'me'])

}, 100000)

test('should logout', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test')
  await page.type('#password', 'test')
  await page.click('.login-button')
  await page.click('.logout-button')

  const url = page.url()

  await browser.close()
  expect(url === "http://localhost:3030/user/login")

}, 100000)


test('should have session on', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test');
  await page.type('#password', 'test');
  await page.click('.login-button')

  await page.goto(
    'http://localhost:3030/user/login'
  )

  const firstname = await page.$$eval('.user-firstname', messages => {
    return messages.map(option => option.textContent)
  })

  const lastname = await page.$$eval('.user-lastname', messages => {
    return messages.map(option => option.textContent)
  })

  await browser.close()
  expect(firstname.concat(lastname) == ['me', 'me'])

}, 100000)

test('should have session off', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test');
  await page.type('#password', 'test');
  await page.click('.login-button')
  await page.click('.logout-button')

  await page.goto(
    'http://localhost:3030/user/login'
  )


  const url = await page.url()
  await browser.close()

  expect(url == 'http://localhost:3030/user/login')

}, 100000)

test('should restrict to have same session ', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test'); // test account id is ae724512-b73d-4cf9-ac35-6a17f4015f56
  await page.type('#password', 'test');
  await page.click('.login-button')

  await page.goto(
    'http://localhost:3030/me/c0d871b5-0f4e-4bb5-acf0-b3c93e3ae4fa'
  )

  const url = await page.url()
  await browser.close()

  expect(url == 'http://localhost:3030/me/ae724512-b73d-4cf9-ac35-6a17f4015f56')

}, 100000)


test('should have session expired', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/user/login'
  )

  await page.type('#email', 'test'); // test account id is ae724512-b73d-4cf9-ac35-6a17f4015f56
  await page.type('#password', 'test');
  await page.click('.login-button')

  await new Promise(res => setTimeout(res, 600100));

  await page.goto('http://localhost:3030/me/ae724512-b73d-4cf9-ac35-6a17f4015f56')

  const url = page.url()

  expect(url == 'http://localhost:3030/user/login')

}, 700000)


