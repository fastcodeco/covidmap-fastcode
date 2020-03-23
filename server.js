const express = require('express')
const path = require('path')
const app = express()
const api_router = express.Router();
const api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const request = require('request-promise');

require('dotenv').config();
app.use(cors());

//security 
app.disable('x-powered-by');
app.use(helmet({
    referrerPolicy: true
}))


app.use(express.static(path.join(__dirname)+'/build'))

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
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [report.point[1] || 0, report.point[0] || 0] 
                    },
                    "properties": {
                        "status": report.type || 'Confirmed',
                        "days": report.days || ''
                      }
                }


            else
                return null;

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

        cases.docs.map((item)=>{
            
            item = item.data().radius;

            console.log(item.type)

            if(!item.type)
            item.type = "Confirmed";


             switch (item.type){
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

        res.send(response[0]);



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

        if(!type){
            res.status(400).end();
            return; 
        }

        if(!captcha){
            res.status(400).end();
            return; 
        }
      
        //let's validate captcha
        let rsc = await request({
            url : "https://www.google.com/recaptcha/api/siteverify",
            method : "POST",
            formData: {
                secret : process.env.CAPTCHA_SECRET || '',
                response : captcha
            }
        });

        rsc = JSON.parse(rsc);
        
        if(rsc.success){
        api.save({ point: radius, days: days, type: type });
        res.status(201).end();
        }else
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

        if(!type){
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