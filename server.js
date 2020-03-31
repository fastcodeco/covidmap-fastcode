const express = require('express')
const path = require('path')
const app = express()
const api_router = express.Router();
const api = require('./api/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const request = require('request-promise');

const fs = require('fs');


require('dotenv').config();
app.use(cors());

//security 
app.disable('x-powered-by');
app.use(helmet({
    referrerPolicy: true
}))


app.use(express.static(path.join(__dirname) + '/build'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//force https
if (process.env.FORCE_HTTPS)
    app.use(function (req, res, next) {
        if ((req.get('X-Forwarded-Proto') !== 'https')) {
            res.redirect('https://' + req.get('Host') + req.url);
        } else
            next();
    });



console.log(path.join(__dirname, 'build'))

api_router
    .get("/cases.geojson", async (req, res, next) => {

        let data = await api.get();

        let response = {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": []
        }




        response.features = await data.docs.map((report) => {

            console.log(report)

            report = report.data().radius;

            console.log(report)

            if (report.point)
                return report.type != "Death" && report.type != "Symptoms" ? {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [report.point[1] || 0, report.point[0] || 0]
                    },
                    "properties": {
                        "status": report.type || 'Confirmed',
                        "days": report.days || ''
                    }
                } : false;


            else
                return false;

        })

        res.send(response);



    })


    api_router
    .get("/casesv2.geojson", async (req, res, next) => {

        let data = [];
        data = await require('./api/scrap.js').getCovidCoDetails().catch(console.log).catch(() => {
            res.json(data);
        });


        let response = {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                }
            },
            "features": []
        }


        let geodata = fs.readFileSync('./api/co.cities.json');
            geodata = JSON.parse(geodata);
            console.log(geodata);




        response.features = await data.map((report) => {

            console.log(report)
            let coordinates = [0,0];

               for(x in geodata){
                   if(report.city.toLowerCase().match("sin identificar"))
                         report.city = "Ibagué";

                    if(geodata[x].city.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(report.city.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
                       coordinates = [geodata[x].latitude, geodata[x].longitude]; 

               }
            
            console.log(coordinates)

                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [coordinates[1], coordinates[0]]
                    },
                    "properties": {
                        "status": 'Confirmed',
                        "confirmed" : report.confirmed,
                        "recovered": report.recovered,
                        "deaths": report.deaths,
                        "city": report.city, 
                        "days": report.days || ''
                    }
                };

     
        })

        res.send(response);



    })

api_router
    .get("/status", async (req, res, next) => {

        let data = await api.getStatus();
        let cases = await api.get();
        let symptoms = 0;
        let self_confirmed = 0;

        let response;

        cases.docs.map((item) => {

            item = item.data().radius;

            console.log(item.type)

            if (!item.type)
                item.type = "Confirmed";


            switch (item.type) {
                case 'Symptoms':
                    symptoms++;
                    break;
                case 'Confirmed':
                    self_confirmed++;
                    break;
                default:
                    self_confirmed++;
            }

        })

        response = data.docs.map((item) => {

            return item.data();

        })

        response[0].symptoms = symptoms;
        response[0].self_confirmed = self_confirmed;

        console.log(response[0])

        res.send(response[0]);



    })

api_router
    .get("/details/:country", async (req, res, next) => {

        let data = [];
        data = await require('./api/scrap.js').getCovidCoDetails().catch(console.log).catch(() => {
            res.json(data);
        });

        res.json(data);

    })


api_router
    .post("/", async (req, res, next) => {

        let radius = req.body.radius;
        let days = req.body.days || 0;
        let captcha = req.body.captcha || null;
        let type = req.body.type || null;



        if (!radius) {
            res.status(400).end();
            return;
        }

        if (!Array.isArray(radius)) {
            res.status(400).end();
            return;
        }

        if (!type) {
            res.status(400).end();
            return;
        }

        if (!captcha) {
            res.status(400).end();
            return;
        }


        //let's validate captcha
        let rsc = await request({
            url: "https://www.google.com/recaptcha/api/siteverify",
            method: "POST",
            formData: {
                secret: process.env.CAPTCHA_SECRET || '',
                response: captcha
            }
        });

        rsc = JSON.parse(rsc);
        

        if (rsc.success) {

            if (type.match("Confirmed"))
                type = "Symptoms";
            
                console.log(type);
        

            api.save({ point: radius, days: days, type: type });
            res.status(201).end();

        } else
            res.status(401).end("invalid captcha");

    })


api_router
    .post("/post", async (req, res, next) => {

        let radius = req.body.radius;
        let days = req.body.days || 0;
        let type = req.body.type || null;

        if (!radius) {
            res.status(400).end();
            return;
        }

        if (!Array.isArray(radius)) {
            res.status(400).end();
            return;
        }

        if (!type) {
            res.status(400).end();
            return;
        }




        let rs = api.save({ point: radius, days: days, type: type });
        res.status(201).json(rs);


    })

app.use('/api', api_router);

app.use((req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});



app.listen(process.env.PORT || 5000, () => {
    console.log(`server runing on port ${process.env.PORT || 5000}`)
})