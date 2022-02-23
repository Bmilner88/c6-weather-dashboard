let currentWeatherEl = document.querySelector('#current-weather');
let searchFormEl = document.querySelector('#search-form')
//let searchBtnEl = document.querySelector('#search-btn');

function getCurrentWeather(event) {
    event.preventDefault();
    
};

searchFormEl.addEventListener('submit', getCurrentWeather);