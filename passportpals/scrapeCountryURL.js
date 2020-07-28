const puppeteer = require('puppeteer')
const scraper = require('./scraper')

async function scrapeURLs(url) {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto(url)


    //when I make the data array i should make it length two with country name and the url

    const data = await page.evaluate(()=> {
        const group = document.querySelector('div.mw-category')
        
        const anchors = Array.from(group.querySelectorAll('a'))
        return anchors.map(a=>a.href)
    })

    //console.log(data)
    for (let country of data) {
       await scraper.scrapeCountry(country)
    }
    browser.close()
}

scrapeURLs('https://en.wikipedia.org/wiki/Category:Visa_requirements_by_nationality')