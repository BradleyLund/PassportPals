const puppeteer = require('puppeteer')

async function scrapeCountry(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const data = await page.evaluate(()=>{
        const table = document.querySelector('table')
        const rows = table.querySelectorAll('tr')
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td')
            return Array.from(columns,column => column.innerText )
        })
      
    })

    console.log(data)
    browser.close();
}

scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')