const puppeteer = require('puppeteer')

async function scrapeChannel(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('/html/body/div[3]/div[3]/div[5]/div/table[1]/tbody')
    const text = await el.getProperty('innerHTML')
    console.log(text)

    browser.close();
}

scrapeChannel('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')