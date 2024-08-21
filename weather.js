const apikey = "7cb5d7d0c5e7f4c9e6e18602a9bd5306";

const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiurl1 = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid=" + apikey
;
const input = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weth-icon");
const btnloc = document.getElementById('get-loc');

async function checkweather(varl) {
    const response = await fetch(apiurl + varl + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        displayWeather(data);
    }
}

async function checkweatherlatlong(lat, long) {
    const response = await fetch(apiurl1.replace("{lat}", lat).replace("{lon}", long));
    if (response.status == 404) 
        {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } 
    else {
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    }
}

function displayWeather(data) {
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.temp1').innerHTML = "Min "+Math.round(data.main.temp_min) + "°C"+"  -  ";
    document.querySelector('.temp2').innerHTML = "Max" +Math.round(data.main.temp_max) + "°C";

    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + "Km/h";

    const weatherMain = data.weather[0].main;
    if (weatherMain == "Clouds") 
        {
        icon.src = "clouds.png";
    } 
    else if (weatherMain == "Drizzle")
         {
        icon.src = "drizzle.png";
    } 
    else if (weatherMain == "Clear")
         {
        icon.src = "clear.png";
    } 
    else if (weatherMain == "Rain")
         {
        icon.src = "rain.png";
    } 
    else if (weatherMain == "Snow")
         {
        icon.src = "snow.png";
    } 
    else if (weatherMain == "Mist") 
        {
        icon.src = "mist.png";
    } 
    else 
    {
        icon.src = "default.png";
    }

    document.querySelector(".weather").style.display = "block";
}

btn.addEventListener('click', () => {
    checkweather(input.value);
});

function gotLocation(position) {
    console.log(position);
    const locButton = document.getElementById("get-loc");
    locButton.classList.add("anim");
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log("Latitude: " + lat);
    console.log("Longitude: " + long);
    checkweatherlatlong(lat, long);
}

function failedToGet() {
    console.log("Failed to get Location");
    const locButton = document.getElementById("get-loc");
    locButton.classList.remove("anim");
}

btnloc.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});
