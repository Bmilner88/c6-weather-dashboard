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
        getCurrentWeather(city);
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
    // temporary object to add to historyList array
    let tempCity = {city: city.name};

    historyList.unshift(tempCity);

    localStorage.setItem('weatherHistory', JSON.stringify(historyList));

    getHistory();
};

function getHistory() {
    // reset historyList array
    historyList = [];

    // pull from localStorage
    let tempHistory = JSON.parse(localStorage.getItem('weatherHistory'));
    
    // push items from localStorage to historyList array
    if(tempHistory) {
        for(i = 0; i < tempHistory.length; i++) {
            historyList.push(tempHistory[i]);
        };
    };

    if(historyList) {
        // reset buttons so it doesn't add over the amount in the list array
        historyListEL.textContent = '';

        // create buttons for each item in the array
        for(i = 0; i < historyList.length; i++) {
            let btn = document.createElement('button');
            
            btn.textContent = historyList[i].city;
            btn.classList = 'btn btn-dark col-12 mb-3';
            btn.setAttribute('data-city',  historyList[i].city.toLowerCase().trim());

            historyListEL.append(btn);
        };
    };
};

searchFormEl.addEventListener('submit', searchSubmitHandler);
historyListEL.addEventListener('click', historyClickHandler);

getHistory();