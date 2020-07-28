const puppeteer = require('puppeteer')
const fs = require('fs')

async function scrapeCountry(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const countryName = await page.evaluate(()=>{
        const legendName = document.querySelector(".thumbcaption > div:nth-child(2)")
        return legendName.innerText
    })


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
   
    const requiredCountries =[]
    const eVisaCountries = []
    const noVisaRequiredCountries = []
    const onArrivalCountries = []
    const otherCountries = []

    for (let country of data) {
        if(country[1]=='Visa required') {
            requiredCountries.push({'name':country[0].trim()})
        } else if(country[1]=='Visa not required') {
            noVisaRequiredCountries.push({'name':country[0].trim()})
        } else if(country[1].includes('Visa on arrival')||country[1].includes('Free')) {
            eVisaCountries.push({'name':country[0].trim()})
        } else if(country[1].includes('eVisa')||country[1].includes('Electronic')||country[1].includes('Online Visa')||country[1].includes('E-tourist')) {
            onArrivalCountries.push({'name':country[0].trim()})
        } else {
            otherCountries.push({'name':country[0].trim()})
        }
    }
 
    let countryObject = {
        "Origin Country":countryName.trim(),
        "Visa required": requiredCountries,
        "No visa required":noVisaRequiredCountries,
        "eVisa": eVisaCountries,
        "Visa on arrival": onArrivalCountries,
        "Other":otherCountries
    }

    let json = JSON.stringify(countryObject,null,2)

    fs.writeFile(`JSONfiles/${countryName}.json`, json, 'utf8', function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('json file write complete')
        }
    })

    browser.close();
}



scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')

//attempt to see if it works on different countries
//scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens')

