let currentWeatherEl = document.querySelector('#current-weather');
let fiveDayWeatherEl = document.querySelector('#five-day');
let searchFormEl = document.querySelector('#search-form')
let citySearchInput = document.querySelector('#city');
let historyListEL = document.querySelector('#history-buttons');

let createDiv = document.createElement('div');
let createH2 = document.createElement('h2');

let historyList = [];

function searchSubmitHandler(event) {
    event.preventDefault();
    
    let cityInput = citySearchInput.value.trim().toLowerCase();
    
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a72b9c777fb2cf77143a024a443dde88`)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    setCurrentWeather(data);
                    
                });
            }
            else {
                alert('Error: city not found');
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
        

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=a72b9c777fb2cf77143a024a443dde88`)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
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

    let htmlText = 
    `<div class="mt-5">
        <h2>${city.name} (${date})</h2>
    </div>`;

    currentWeatherEl.innerHTML = htmlText;

    addHistory(city);
};

function getFiveDayWeather(city) {
    let forecast = city.list;
    
    let htmlText = '';
    for(i = 0; i < forecast.length; i += 8) {
        htmlText += 
        `<div class="card">
            <h2>${forecast[i].dt_txt}</h2>
        </div>`
        fiveDayWeatherEl.innerHTML = htmlText;
    }
};

function addHistory(city) {
    // temporary object to add to historyList array
    let tempCity = {city: city.name};

    // remove duplicate items
    historyList = historyList.filter(function(i) {
        return i.city != tempCity.city;
    });

    // add new item
    historyList.unshift(tempCity);

    // save to localStorage
    localStorage.setItem('weatherHistory', JSON.stringify(historyList));

    // get the items from localStorage
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