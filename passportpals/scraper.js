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

    for (let i=0;i<data.length;i++) {
        

        //first entry is undefined for some reason, remove it
        if (typeof data[i][1] == 'undefined') {
            data.splice(i,1)
        }

        data[i].splice(2)

        //get rid of the wikipedia footnote link
        let regex = /(\[\d*\])/g
        data[i][1] = data[i][1].replace(regex,'')

        //add an visaIndicator value for future chloropleth map use or not??
       
    }
   
    console.log(data)
    browser.close();
}



//scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')

//attempt to see if it works on different countries
scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens')

