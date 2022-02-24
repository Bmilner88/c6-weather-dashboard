let currentWeatherEl = document.querySelector('#current-weather');
let searchFormEl = document.querySelector('#search-form')
let citySearchInput = document.querySelector('#city');
let historyListEL = document.querySelector('#history-buttons');

let createDiv = document.createElement('div');
let createH2 = document.createElement('h2');

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
                    displayWeather(data);
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

function displayWeather(city) {
        createDiv.classList = '';
        createH2.textContent = '';

        createDiv.classList = 'card mt-5';
        createH2.textContent = `${city.name} ()`;

        createDiv.appendChild(createH2);
        currentWeatherEl.append(createDiv);
};

/* function addHistory(city) {
    if(city.getAttribute('data-city')) {
        let btn = document.createElement('button');
        //let liId = document.querySelector(`#${city.name.toLowerCase()}`);

        btn.textContent = city.name;
        btn.classList = 'btn btn-dark col-12 mb-3';
        btn.setAttribute('data-city', city.name.toLowerCase())

        historyListEL.append(btn);
    };
}; */

searchFormEl.addEventListener('submit', searchSubmitHandler);
historyListEL.addEventListener('click', historyClickHandler);