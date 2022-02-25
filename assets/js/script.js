let fiveDayWeatherEl = document.querySelector('#five-day');
let fiveDayTextEl = document.querySelector('#five-day-text');
let searchFormEl = document.querySelector('#search-form')
let citySearchInput = document.querySelector('#city');
let historyListEL = document.querySelector('#history-buttons');

let createDiv = document.createElement('div');
let createH2 = document.createElement('h2');

let currentWeatherEl = document.querySelector('#current-weather');
let cityTitle = document.getElementById('city-title');
let currentUl = document.getElementById('current-list');
let tempLi = document.getElementById('temp');
let windSpeedLi = document.getElementById('wind-speed');
let humidityLi = document.getElementById('humidity');
let uvIndexLi = document.getElementById('uv-index');

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
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        }
    );
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=a72b9c777fb2cf77143a024a443dde88`)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    getFiveDayWeather(data);
                });
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        }
    );
};

function getUVIndex(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=a72b9c777fb2cf77143a024a443dde88`)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    let uvi = data.current.uvi;
                    let color;

                    if(uvi <= 3) {
                        color = 'success';
                    }
                    else if((uvi >= 3) && (uvi <= 7)) {
                        color = 'warning';
                    }
                    else {
                        color = 'danger';
                    };

                   uvIndexLi.innerHTML = `<span class="rounded bg-${color}">UV Index: ${uvi}</span>`
                });
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        }
    );
};

function setCurrentWeather(city) {
    let date = moment().format('L');

    cityTitle.innerHTML = `${city.name} (${date}) ${getIcon(city)}`;
    tempLi.innerText = `Temp: ${city.main.temp}°`;
    windSpeedLi.innerText = `Wind Speed: ${city.wind.speed}mph`;
    humidityLi.innerText = `Humidity: ${city.main.humidity}`;

    //currentWeatherEl.innerHTML = htmlText;

    getUVIndex(city.coord.lat, city.coord.lon);

    addHistory(city);
};



function getFiveDayWeather(city) {
    let forecast = city.list;
    
    let htmlText = '';
    for(i = 0; i < forecast.length; i += 8) {
        // pull and format date for 5-day cards
        let date = forecast[i].dt_txt;
        year = date.slice(0, 4);
        date = date.slice(0, -9).substring(5).replace('-', '/').concat('/', year);

        // set the html for the 5-day cards
        htmlText += 
        `<div class="card mt-5">
            <h4 class="card-title text-center m-3">${date} ${getIcon(forecast[i])}</h4>
            <ul class="card-body ml-3">
                <li>Temp: ${forecast[i].main.temp}°</li>
                <li>Wind Speed: ${forecast[i].wind.speed}mph</li>
                <li>Humidity: ${forecast[i].main.humidity}</li>
            </ul>
        </div>`
        fiveDayTextEl.textContent = '5-Day Forecast: ';
        fiveDayWeatherEl.innerHTML = htmlText;
    };
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

function getIcon(city) {
    let condition = city.weather[0].main.toLowerCase(); 
    switch(condition) {
        case 'thunderstorm':
            return '<i class="bi bi-cloud-lightning-fill"> Thunderstorm</i>';
        case 'drizzle':
            return '<i class="bi bi-cloud-rain-fill"> Drizzle</i>';
        case 'rain':
            return '<i class="bi bi-cloud-rain-heavy-fill"> Rain</i>';
        case 'snow':
            return '<i class="bi bi-cloud-snow-fill"> Snow</i>';
        case 'clear':
            return '<i class="bi bi-brightness-high-fill"> Clear</i>';
        case 'clouds':
            return '<i class="bi bi-clouds-fill"> Clouds</i>';
        default:
            return '<i class="bi bi-brightness-high-fill"> ?</i>';
    };
};

searchFormEl.addEventListener('submit', searchSubmitHandler);
historyListEL.addEventListener('click', historyClickHandler);

getHistory();