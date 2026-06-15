
let Search = document.querySelector(".Search");
Search.addEventListener("keydown",function(event){
     if(event.key == "Enter"){
        getweather();
     };
});
async function getweather() {
    const area = Search.value;
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${area}&count=1`;
   
    
    const geoResponse = await fetch(geoURL);
    const geoData =  await geoResponse.json();
    
    if(!geoData.results){
        document.querySelector(".area").innerText = "City Not Found";
        return;
    }
    
     
    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
     const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;

    
    const weatherResponse = await fetch(URL);
    const weatherData = await weatherResponse.json();

    document.querySelector(".area").innerText = `Area : ${area}`;
    document.querySelector(".temprature").innerText = `Temperature: ${weatherData.current.temperature_2m}°C`;
    document.querySelector(".wind").innerText = `${weatherData.current.wind_speed_10m}km/h`;
    const img = document.querySelector(".weather_img");
    const temp = weatherData.current.temperature_2m;

     if (temp > 30) {
    img.src = "sunny.jfif";
      }
    else if (temp > 20) {
    img.src = "cloudy.png";
    }
    else if (temp > 10) {
    img.src = "rainy.jfif";
     }
    else {
    img.src = "storm.webp";
     }
};
