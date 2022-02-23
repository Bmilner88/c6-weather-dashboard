let currentWeatherEl = document.getElementById('#current-weather');
let searchFormEl = document.getElementById('#search-form')
let searchBtnEl = document.getElementById('#search-btn');

function getCurrentWeather() {
    console.log('test');
};

searchFormEl.addEventListener('submit', getCurrentWeather)