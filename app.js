const icon = document.querySelector(".weather-icon");
const tempEle = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const loca = document.querySelector(".location p");
const notification = document.querySelector(".notification");
const searchBar = document.getElementById('searchBar');
const Kelvin = 273;
const key = "dba1307e202ed696979050d4f5a5a838"

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    searchBar.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            cityName= e.target.value.toLowerCase();
            getCityWeather(cityName);
        }
    });
});


const weather = {};

weather.temperature = {
    unit: "celsius"
}
// see if user accepted allowing geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
//recieve users coords
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}
// Error shown when there is no geolocation services
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


function showWeather(){
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempEle.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    desc.innerHTML = weather.description;
    loca.innerHTML = `${weather.city}, ${weather.country}`;
}
// Translate Celsius to Fahrenheit
function translateTemp(temperature){
    return (temperature*(9/5)+32)
}
// when temprature is clicked on switch to farenheit or celsius
tempEle.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = translateTemp(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit); // remove decimals
        tempEle.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else{
        tempEle.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }

});

async function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    const resp = await fetch(api);
    const data = await resp.json()  
        
    weather.temperature.value = Math.floor(data.main.temp - Kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    showWeather();
      
};
async function getCityWeather(city){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const resp = await fetch(api);
    const data = await resp.json()     
    weather.temperature.value = Math.floor(data.main.temp - Kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    showWeather();
           
};