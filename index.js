var NodeGeocoder = require('node-geocoder');
const express = require('express');
const cors = require('cors');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const slowDown = require("express-slow-down");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '100mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
 
/*const speedLimiter = slowDown({
  windowMs: 3 * 60 * 1000, // 3 minutes
  delayAfter: 3, // allow 100 requests per 15 minutes, then...
  delayMs: 1000 // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});*/


/*const database_summary = new Datastore('database_summary.db');
database_summary.loadDatabase();*/

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

/*app.post('/api_summary', (request, response) => {
  const data_summary = request.body;
  const timestamp = Date.now();
  data_summary.timestamp = timestamp;
  database_summary.insert(data_summary);
  response.json(data_summary);
});*/

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

let cachedData;
let cacheTime;

app.get('/weather/:latlon',  async (request, response, next) => {

  if(cacheTime && cacheTime > Date.now() - 30 * 1000){
    console.log("Please wait for 100 sec for update! Cached data is presented to you!");
    return response.json(cachedData);
  }
  try{
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const api_key_openweathermap = process.env.API_KEY_OPENWEATHERMAP;
    const api_key_visualcrossing = process.env.API_KEY_VISUALCROSSING;
    const api_key_location = process.env.API_KEY_LOCATION;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key_openweathermap}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();
  
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();
  
    /*const summary_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/historysummary?aggregateHours=24&minYear=1989&maxYear=2019&chronoUnit=months&breakBy=self&dailySummaries=true&contentType=json&unitGroup=us&locationMode=single&key=${api_key_visualcrossing}&locations=${lat},%20${lon}`;
    const summary_response = await fetch(summary_url);
    const summary_data = await summary_response.json();
    //console.log(summary_data);*/
  
    
    const city_url = `https://us1.locationiq.com/v1/reverse.php?key=${api_key_location}&lat=${lat}&lon=${lon}&format=json`;
    const city_response = await fetch(city_url);
    const city_data = await city_response.json();
  
  
    const data = {
      weather: weather_data,
      air_quality: aq_data,
      //summary_gps: summary_data,
      city_loc: city_data
    };

    cachedData = data;
    cacheTime = Date.now();
    return response.json(data);
  }
  catch(error){
    return next(error);
  }
});


