
const axios = require("axios");
const cheerio = require("cheerio");


const scrap = {

    fetchData : async (siteUrl) => {
        const result = await axios.get(siteUrl);
        return cheerio.load(result.data);
      },
      getCovidCoDetails : async()=>{
        console.log("great")
        let $ = await scrap.fetchData(process.env.CO_REPORT_DATA || "https://es.wikipedia.org/wiki/Pandemia_de_enfermedad_por_coronavirus_de_2020_en_Colombia");
    
        let data = [];
    
        $(".wikitable").first().find("tr").each((i,e)=>{
    
            let details = {};
            
            $(e).find("td").each((i,e)=>{
    
                switch (i){
                    case 0:
                        details.city = $(e).text().replace(/[\n\r]/g,"");
                    break;
                    case 1:
                        details.state = $(e).text().replace(/[\n\r]/g,"");
                    break;
                    case 2:
                        details.confirmed = $(e).text().replace(/[\n\r]/g,"");
                    break;
                    case 3:
                        details.recovered = $(e).text().replace(/[\n\r]/g,"");
                    break;
                    case 4:
                        details.deaths = $(e).text().replace(/[\n\r]/g,"")
                }
    
            })

    
            if(details.city)
            data.push(details);
            
    
        })
    
        console.log(data);
        return data;
    
      }

}





module.exports = scrap;


