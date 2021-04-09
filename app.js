const form = document.getElementById('form');
const input = document.getElementById('search');
const main = document.getElementById('main');

const apikey = "93fbf9a2818643bf7d04c2f58b6e252a";

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
       const response = await fetch(url(city), {origin: 'cors'});
       const data = await response.json();

       addToPage(data)
}


function addToPage(city) {
    let temp = KtoC(city.main.temp);
    let temp_min = KtoC(city.main.temp_min);
    let temp_max = KtoC(city.main.temp_max)

     const weather = document.createElement('div');
     weather.classList.add("weather");
     weather.innerHTML = `
            <h4>${city.name}, <span>${city.sys.country}</span></h4>
            <p>Today is: <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png" />${temp}℃ <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png" /> </p>
            <p>The min temp today is: ${temp_min}℃</p>
            <p>The max temp today is: ${temp_max}℃</p>
     `
     main.innerHTML = '';
     main.appendChild(weather);
}


function KtoC(K){
    return Math.floor(K - 273.15);
}



form.addEventListener('submit', (e) => {
    e.preventDefault();

    let val = input.value;

    if(val) {
       getWeatherByLocation(val);
    }
})
