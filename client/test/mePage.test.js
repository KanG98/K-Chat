const puppeteer = require('puppeteer')

test('should display user info and joined rooms', async () => {
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

  const userFirstName = await page.$$eval('.user-firstname', messages => {
    return messages.map(option => option.textContent)
  }); 

  const userHostedRooms = await page.$$eval('.my-room-list .room-li', messages => {
    return messages.map(option => option.textContent)
  }); 

  const userJoinedRooms = await page.$$eval('.other-room-list .room-li', messages => {
    return messages.map(option => option.textContent)
  }); 

  browser.close()
  expect([userFirstName[0], userHostedRooms[0], userJoinedRooms[0]])
  .toEqual(["me","942efb83-5277-474a-b64b-f0b927c1a051", "feeb0b99-1df5-4e21-982c-07833568d072"]);

}, 100000)


