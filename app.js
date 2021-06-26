// api key : 82005d27a116c2880c8f0fcb866998a0
const icon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature-value p");
const desc = document.querySelector(".temperature-description p");
const loca = document.querySelector(".location p");
const notification = document.querySelector(".notification");

const weather = {};

weather.temperature = {
    unit: "celsius"
}

function showWeather(){
    icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    desc.innerHTML = weather.description;
    loca.innerHTML = `${weather.city}, ${weather.country}`;
}
// Translate Celsius to Fahrenheit
function translateTemp(temperature){
    return (temperature*(9/5)+32)
}
// when temprature is clicked on switch to farenheit or celsius
temp.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = translateTemp(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit); // remove decimals
        temp.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else{
        temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }

});