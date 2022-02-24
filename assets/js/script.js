let currentWeatherEl = document.querySelector('#current-weather');
let searchFormEl = document.querySelector('#search-form')
let citySearchInput = document.querySelector('#city');
let historyListEL = document.querySelector('#history-buttons');

let createDiv = document.createElement('div');
let createH2 = document.createElement('h2');

let historyList = [];

function searchSubmitHandler(event) {
    event.preventDefault();
    
    let cityInput = citySearchInput.value.trim();
    
    if(cityInput) {
        getCurrentWeather(cityInput);
    }
    else {
        alert('Please enter a city');
    };
};

function historyClickHandler(event) {
    let city = event.target.getAttribute('data-city');

    if(city) {
        currentWeather(city);
    };
};

function getCurrentWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a72b9c777fb2cf77143a024a443dde88`;

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    setCurrentWeather(data);
                    getFiveDayWeather(data);
                });
            }
            else {
                alert('Error: city not found');
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};

function setCurrentWeather(city) {
    let date = moment().format('L');

    createDiv.classList = '';
    createH2.textContent = '';

    createDiv.classList = 'mt-5';
    createH2.textContent = `${city.name} (${date})`;

    createDiv.appendChild(createH2);
    currentWeatherEl.append(createDiv);

    addHistory(city);
};

function getFiveDayWeather(city) {
    //console.log('fivedaytest')
};

function addHistory(city) {
    let tempCity = {city: city.name};
    historyList.push(tempCity);
    localStorage.setItem('weatherHistory', JSON.stringify(historyList));
    getHistory();
};

function getHistory() {
    historyList = [];

    let tempHistory = JSON.parse(localStorage.getItem('weatherHistory'));
    
    if(tempHistory) {
        for(i = 0; i < tempHistory.length; i++) {
            historyList.push(tempHistory[i]);
        };
    };
    console.log(historyList);
}

searchFormEl.addEventListener('submit', searchSubmitHandler);
//historyListEL.addEventListener('click', historyClickHandler);

getHistory();