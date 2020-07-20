const puppeteer = require('puppeteer')

async function scrapeCountry(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    //scrape of the whole table
   // const [el] = await page.$x('/html/body/div[3]/div[3]/div[5]/div/table[1]/tbody')

   //scrape of the country
    const [el] = await page.$x('/html/body/div[3]/div[3]/div[5]/div/table[1]/tbody/tr[1]/td[1]/a')
    const countryName = await el.getProperty('innerHTML')
    //scrape of the visaRequirement
    const [el] = await page.$x('/html/body/div[3]/div[3]/div[5]/div/table[1]/tbody/tr[1]/td[2]')
    const visaRequired = await

    const text = await el.getProperties()
    console.log(el._remoteObject)

    //try get one row of data
    //maybe the xpath should be a path to the top row needs specifically
    //  and then change the xpath needs as we loop through the entire table
    // we just want countryName and visaRequirement
    

    browser.close();
}

scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')