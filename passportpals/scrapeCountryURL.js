const puppeteer = require('puppeteer')
const scraper = require('./scraper')

async function scrapeURLs(url,url2) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)


    //when I make the data array i should make it length two with country name and the url

    const data = await page.evaluate(()=> {
        const group = document.querySelector('div.mw-category')
        
        
        const anchors = Array.from(group.querySelectorAll('a'))
        return anchors.map(a=>a.href)
    })

    //scrape the URL's from page 2

    await page.goto(url2)

    const data2 = await page.evaluate(()=> {
        const group2 = document.querySelector('div.mw-category')

        const anchors2 = Array.from(group2.querySelectorAll('a'))
        return anchors2.map(a=>a.href)
    })

    const allURLs = [...data,...data2]

    for (let country of allURLs) {
       await scraper.scrapeCountry(country)
    }
    browser.close()
}

scrapeURLs('https://en.wikipedia.org/wiki/Category:Visa_requirements_by_nationality','https://en.wikipedia.org/w/index.php?title=Category:Visa_requirements_by_nationality&pagefrom=Trinidad+and+Tobago%0AVisa+requirements+for+Trinidad+and+Tobago+citizens#mw-pages')