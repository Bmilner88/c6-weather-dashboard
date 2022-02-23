let currentWeatherEl = document.querySelector('#current-weather');
let searchFormEl = document.querySelector('#search-form')
let citySearchInput = document.querySelector('#city');

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

function getCurrentWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ed8c37d6621ba937986a99f2b95f865`;

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                })
            }
            else {
                alert('Error: city not found');
            };
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};

function displayWeather(city) {};

searchFormEl.addEventListener('submit', searchSubmitHandler);