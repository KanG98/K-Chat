const puppeteer = require('puppeteer')

test('should send and receive message', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/chat/user1/room1'
  );

  // second user

  const browser2 = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080', '--window-position=600,0']
  }); 

  const page2 = await browser2.newPage();
  await page2.goto(
    'http://localhost:3030/chat/user2/room1' 
  );

  await page2.type('input.chat-input', 'Cindy');
  await page2.click('.chat-send-btn');

  // user 1 gets the message of user 2
  const finalText1 = await page.$$eval('.message-field-message', messages => {
    return messages.map(option => option.textContent)
  });

  // user 1 sends message
  await page.type('input.chat-input', 'Kyle');
  await page.click('.chat-send-btn');

  // user 1 leaves chat room
  await browser.close()

  const finalText2 = await page2.$$eval('.message-field-message', messages => {
    return messages.map(option => option.textContent)
  }); 
  await browser2.close()

  expect(finalText1.concat(finalText2)).toStrictEqual(['user2 has joined the chat', 'Cindy', 'Cindy', 'Kyle', 'user1 user has left the chat']); 

}, 100000)


test('should go to main page when there is no session', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=900,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'http://localhost:3030/chat/user1/room1'
  );
  browser.close()
  expect(page.url == "http://localhost:3030/user/login")

}, 100000)

test('should go to main when the session is logged out', async () => {
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
    'http://localhost:3030/chat/ae724512-b73d-4cf9-ac35-6a17f4015f56/942efb83-5277-474a-b64b-f0b927c1a051'
  )
  browser.close()
  expect(page.url == "http://localhost:3030/user/login")
}, 100000)