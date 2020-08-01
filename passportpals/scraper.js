const puppeteer = require('puppeteer')
const fs = require('fs')
const populateDB = require('./populateDB')
const country = require('./models/country')

async function scrapeCountry(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const countryName = await page.evaluate(()=>{
        const legendName = document.querySelector(".thumbcaption > div:nth-child(2)")
        if(legendName!= null) {
            return legendName.innerText
        } else {
            return undefined
        }

        
    })

    if (countryName == undefined) {
        console.log(`countryName undefined: ${url}`)
        fs.appendFile('errors.txt',`
        countryName undefined: ${url}`,function(err) {
            if (err) {
                console.log(err)
            }
            console.log('updated')
        })
        browser.close();
        return
    }

    const data = await page.evaluate(()=>{
        //const table = document.querySelector('table')
        const table = document.querySelector('table')
        const rows = table.querySelectorAll('tr')
            if (rows!=null){
                return Array.from(rows, row => {
                    const columns = row.querySelectorAll('td')
                    return Array.from(columns,column => column.innerText )
                })
            } else {
                return undefined
            }
    })

        
    if (data==undefined) {
        console.log(`data undefined: ${url} + ${countryName}`)
        fs.appendFile('errors.txt',`
        data undefined: ${url} + ${countryName}`,function(err) {
            if (err) {
                console.log(err)
            }
            console.log('updated')
        })
        browser.close();
        return
    }
    


    for (let i=0;i<data.length;i++) {
        

        //first entry is undefined for some reason, remove it
        if (typeof data[i][1] == 'undefined') {
            data.splice(i,1)
        }

        data[i].splice(2)

        if (data[i][1]===undefined) {
            console.log(`datatable is different: ${url} + ${countryName}`)
            fs.appendFile('errors.txt',`
            datatable is different: ${url} + ${countryName}`,function(err) {
                if (err) {
                    console.log(err)
                }
                console.log('updated')
            })
            browser.close();
            return
        }

        //get rid of the wikipedia footnote link
        let regex = /(\[\d*\])/g
        data[i][1] = data[i][1].replace(regex,'')

        //add an visaIndicator value for future chloropleth map use or not??
        
    }
   
    const requiredCountries =[]
    const dbReqCountries = []

    const eVisaCountries = []
    const dbeVisaCountries = []

    const noVisaRequiredCountries = []
    const dbNoVisaReq = []

    const onArrivalCountries = []
    const dbOnArrival = []

    const otherCountries = []
    const dbOther = []

    for (let country of data) {
        if(country[1]=='Visa required') {
            requiredCountries.push({'name':country[0].trim()})
            dbReqCountries.push(country[0].trim())
        } else if(country[1]=='Visa not required') {
            noVisaRequiredCountries.push({'name':country[0].trim()})
            dbNoVisaReq.push(country[0].trim())
        } else if(country[1].includes('Visa on arrival')||country[1].includes('Free')) {
            eVisaCountries.push({'name':country[0].trim()})
            dbeVisaCountries.push(country[0].trim())
        } else if(country[1].includes('eVisa')||country[1].includes('Electronic')||country[1].includes('Online Visa')||country[1].includes('E-tourist')) {
            onArrivalCountries.push({'name':country[0].trim()})
            dbOnArrival.push(country[0].trim())
        } else {
            otherCountries.push({'name':country[0].trim()})
            dbOther.push(country[0].trim())
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


    populateDB.countryCreate(countryName.trim(),dbReqCountries,dbNoVisaReq,dbeVisaCountries,dbOnArrival,dbOther)

    let json = JSON.stringify(countryObject,null,2)

    fs.writeFile(`JSONfiles/${countryName.trim()}.json`, json, 'utf8', function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`json file write complete: ${countryName}`)
        }
    })

    browser.close();
}

module.exports = {
    scrapeCountry
}



//scrapeCountry('https://en.wikipedia.org/wiki/Visa_requirements_for_South_African_citizens')


