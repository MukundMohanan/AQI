// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air, summary;
    
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      var currentdate = new Date();
      const api_url = `weather/${lat},${lon}`;
      //console.log(api_url);
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather;
      air = json.air_quality;
      summary = json.summary_gps;
      var UNIX_Timestamp = weather.dt;
      //console.log(UNIX_Timestamp);
      var lastupdate = new Date(UNIX_Timestamp * 1000);

      let cachedTime = Date.now();

      if(cachedTime && cachedTime > Date.now() - 100 * 1000){
        console.log("There is a request limiter for requesting the data! Limit : 3")
        console.log("Please wait for 100 sec for update! Cached data is presented to you!");
        document.getElementById('warning').textContent = "Please wait for 100 sec for update! Cached data is presented to you!";
      }
      
      //console.log(cachedTime);

      document.getElementById('summary').textContent = weather.weather[0].description;
      document.getElementById('wind').textContent = weather.wind.speed;
      document.getElementById('temp').textContent = weather.main.temp;
      document.getElementById('temp_max').textContent = weather.main.temp_max;
      document.getElementById('temp_min').textContent = weather.main.temp_min;
      document.getElementById('pressure').textContent = weather.main.pressure;
      document.getElementById('humidity').textContent = weather.main.humidity;
      document.getElementById('lastupdate').textContent = lastupdate;
      document.getElementById('time').textContent = currentdate;
      console.log(air.results);

      var o3 = 'NO DATA';
      var no2 = 'NO DATA';
      var co = 'NO DATA';
      var so2 = 'NO DATA';
      var pm25 = 'NO DATA';
      var pm10 = 'NO DATA';
      var aqparamter = 'NO DATA';
      var locc = 'NO DATA';
      var conn = 'NO DATA';
      var cityy = 'NO DATA';
      var update = 'NO DATA';
      var valuess = 'NO DATA';
      var unitss = 'NO DATA';
      
      if(Array.isArray(air.results) && air.results.length){
        aqparamter = air.results[0].measurements[0].parameter;
        locc = air.results[0].location;
        conn = air.results[0].country;      
        cityy = air.results[0].city;
        valuess = air.results[0].measurements[0].value;
        unitss = air.results[0].measurements[0].unit;
        update = air.results[0].measurements[0].lastUpdated;

        let count = air.results[0].measurements.length;
        var array = air.results[0].measurements;
        

        for(let i = 0; i < count; i++){
            console.log(array[i].parameter);
            if(array[i].parameter == 'o3'){
              o3 = array[i].value;
              console.log(o3);
            }
            else if(array[i].parameter == 'no2'){
              no2 = array[i].value;
              console.log(no2);
            }
            else if(array[i].parameter == 'co'){
              co = array[i].value;
              console.log(co);
            }
            else if(array[i].parameter == 'so2'){
              so2 = array[i].value;
              console.log(so2);
            }
            else if(array[i].parameter == 'pm25'){
              pm25 = array[i].value;
              console.log(pm25);
            }
            else if(array[i].parameter == 'pm10'){
              pm10 = array[i].value;
              console.log(pm10);
            }
        }
      }

      
      document.getElementById('aq_value').textContent = valuess;
      document.getElementById('aq_units').textContent = unitss;
      document.getElementById('aq_date').textContent = update;
      document.getElementById('aq_parameter').textContent = aqparamter;
      document.getElementById('location').textContent = locc;
      document.getElementById('country').textContent = conn;
      document.getElementById('city').textContent = cityy;

      document.getElementById('o3').textContent = o3;
      document.getElementById('no2').textContent = no2;
      document.getElementById('co').textContent = co;
      document.getElementById('so2').textContent = so2;
      document.getElementById('pm25').textContent = pm25;
      document.getElementById('pm10').textContent = pm10;
    
    
      
      
      const data = { lat, lon, weather, air };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);

    

    /*const data_summary = { summary };
    const options_summary = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_summary)
    };
    const db_summary_response = await fetch('/api_summary', options_summary);
    const db_summary_json = await db_summary_response.json();
    console.log(db_summary_json);*/
  }
  );
} else {
  console.log('geolocation not available');
}
