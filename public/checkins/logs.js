const mymap = L.map('checkinMap').setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    let txt = `The weather here at ${item.lat}&deg;,
    ${item.lon}&deg; is ${item.weather.weather[0].description} with
    a temperature of ${item.weather.main.temp}&deg; C.`;

    if (item.air.value < 0) {
      txt += '  No air quality reading.';
    } else {
      txt += `  Last read on ${item.weather.dt}`;
    }
    marker.bindPopup(txt);
  }
  
  appendData(data);
  function appendData(data) {
    var mainContainer = document.getElementById("data");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        var myJSON = JSON.stringify(data[i]);
        div.innerHTML = (i+1) + myJSON;
        mainContainer.appendChild(div);
    }
}


  console.log(data);
}

