const express = require('express')
const path = require('path')
const app = express()
const api_router = express.Router();
const api = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

app.use(cors());

//security 
app.disable('x-powered-by');
app.use(helmet({
    referrerPolicy: true
}))


app.use(express.static(path.join(__dirname)))

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
    .get("/", async (req, res, next) => {

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

            report = report.data().radius;

            console.log(report)

            if (report.point)
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [report.point[1] || 0, report.point[0] || 0] 
                    }
                }


            else
                return null;

        })

        res.send(response);



    })


api_router
    .post("/", async (req, res, next) => {

        let radius = req.body.radius;
        let days = req.body.days || 0;

        if (!radius) {
            res.status(400).end();
            return;
        }

        if (!Array.isArray(radius)) {
            res.status(400).end();
            return;
        }


      


        api.save({ point: radius, days: days });

        res.status(201).end();

    })

app.use('/api', api_router);

app.use((req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});



app.listen(process.env.PORT || 5000, () => {
    console.log(`server runing on port ${process.env.PORT || 5000}`)
})