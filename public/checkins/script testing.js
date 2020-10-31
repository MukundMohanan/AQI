
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, fixLat, fixLon;
    
    fixLat = position.coords.latitude;
    fixLon = position.coords.longitude;
      lat = fixLat.toFixed(2);
      lon = fixLon.toFixed(2);


      var OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var  osmLayer1  =  L.tileLayer(OSM_URL);  
    var  osmLayer2  =  L.tileLayer(OSM_URL);  
    var  osmLayer3  =  L.tileLayer(OSM_URL);  
    var  osmLayer4  =  L.tileLayer(OSM_URL);  
    var  osmLayer5  =  L.tileLayer(OSM_URL);  
    var  osmLayer6  =  L.tileLayer(OSM_URL);  
    var  osmLayer7  =  L.tileLayer(OSM_URL);  

    var  map_usepa_aqi    =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_aqi  =  L.tileLayer(map_usepa_aqi);  
    var  map_usepa_pm25    =  "https://tiles.waqi.info/tiles/usepa-pm25/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_pm25  =  L.tileLayer(map_usepa_pm25);  
    var  map_usepa_pm10    =  "https://tiles.waqi.info/tiles/usepa-10/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_pm10  =  L.tileLayer(map_usepa_pm10);  
    var  map_usepa_o3    =  "https://tiles.waqi.info/tiles/usepa-o3/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_o3  =  L.tileLayer(map_usepa_o3);  
    var  map_usepa_no2    =  "https://tiles.waqi.info/tiles/usepa-no2/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_no2  =  L.tileLayer(map_usepa_no2);  
    var  map_usepa_so2    =  "https://tiles.waqi.info/tiles/usepa-so2/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_so2  =  L.tileLayer(map_usepa_so2);  
    var  map_usepa_co    =  "https://tiles.waqi.info/tiles/usepa-co/{z}/{x}/{y}.png?token=14f9dbeb59734650cb2ccb2fa3ec598e02744853";
    var  waqiLayer_co  =  L.tileLayer(map_usepa_co);  


   


    var  map_usepa_aqi  =  L.map('map_usepa_aqi').setView([lat, lon], 12);  
    map_usepa_aqi.addLayer(osmLayer1).addLayer(waqiLayer_aqi);  
    var  map_usepa_pm25  =  L.map('map_usepa_pm25').setView([lat, lon], 12);  
    map_usepa_pm25.addLayer(osmLayer2).addLayer(waqiLayer_pm25);  
    var  map_usepa_pm10  =  L.map('map_usepa_pm10').setView([lat, lon], 12);  
    map_usepa_pm10.addLayer(osmLayer3).addLayer(waqiLayer_pm10);  
    var  map_usepa_o3  =  L.map('map_usepa_o3').setView([lat, lon], 12);  
    map_usepa_o3.addLayer(osmLayer4).addLayer(waqiLayer_o3);  
    var  map_usepa_no2  =  L.map('map_usepa_no2').setView([lat, lon], 12);  
    map_usepa_no2.addLayer(osmLayer5).addLayer(waqiLayer_no2);  
    var  map_usepa_so2  =  L.map('map_usepa_so2').setView([lat, lon], 12);  
    map_usepa_so2.addLayer(osmLayer6).addLayer(waqiLayer_so2);  
    var  map_usepa_co  =  L.map('map_usepa_co').setView([lat, lon], 12);  
    map_usepa_co.addLayer(osmLayer7).addLayer(waqiLayer_co);

    
  

}
);
}
else {
      console.log('geolocation not available');
    }
    
