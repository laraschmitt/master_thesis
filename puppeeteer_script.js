const fs = require('fs');
const puppeteer = require('puppeteer');
const data = require('./data.json');
// https://json-csv.com/

const cookies = [
  {
    name: 'meerkat',
    value: '.eJwlj0tqQzEMAO_idRayJMtWLhP0My2FFt5LVqV3z4MeYJiZ3_bYR50f7f48XnVrj89s96aA7uAjuiXK3Klr7ChjUkYwUVrKiToIgYGNBkevbpBjD1owq9SpEAS9WGZRGsNMtFWMMZFSQDeP5VMIYNKlgG5szHtltFuL89iP589XfV89HczFIYgjI6UbgS4P3GU4wib2lKLaF_c66_ifGG5arkESvgeIOdEy8_b3Bis8RdE.EM7-Cg.QbO6Yixh_1XufiVmQBi_cCrSaDM',
    domain: 'meerkat.peat-cloud.com',
    path: '/',
    expires: -1,
    size: 282,
    httpOnly: true,
    secure: false,
    session: true
  }
];

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
              clearInterval(timer);
              resolve();
          }
      }, 100);
    });
  });
}

(async () => {
  let count = 0;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.setCookie(...cookies);
  await page.goto('https://meerkat.peat-cloud.com/classify');

  //await page.type('#email', 'lara@plantix.net')
  //await page.type('#password', 'VBplMy')
  //await page.click('button[type="submit"]')
  //await page.waitForNavigation();
  //console.log(page.cookies())


  async function prompt() {
    if (typeof data[count].predicate != 'undefined') {
      console.log('Already recorded');
      count++;
      await prompt()
      return;
    }
    await page.type('#s-filename.form-control', data[count].filename_clean);
    await page.click('#search');
    await autoScroll(page);
    await page.waitFor(500)

    const result = await page.evaluate((data, count) => {
      document.querySelector('#s-filename.form-control').value = '';
      const promptResult = prompt(data[count].dnn_variety_0, 1);
      return promptResult;
    }, data, count);

    console.log(result);
    data[count].predicate = result;
    fs.writeFileSync('./data.json', JSON.stringify(data));
    count++;
    await page.click('a[href="#collapseOne"]');
    await prompt();
    return;
  }

  await prompt();



  page.on('confirm', async dialog => {
    console.log(dialog.message());
  });


  //await browser.close();
})();
