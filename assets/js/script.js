console.log("js script connected")

//api key
let api = "36766f9ac5083f2ffedc325da251c95a"


//dom declaration
let searchBtn = $('#searchBtn')
let city = $('#searchInput')
let currentWeatherDiv = $("#currentWeather");

//variable declarations
let currentWeather = new Object();
let forecastWeather = [];
let momentFormat = "MMM DD, YYYY"



function loadHistory() {
    //parse json
    //render into search
}

function fetchFunc(fetchURL) {
    fetch(fetchURL, {
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('error ' + response.status)
                $('#exampleModal').modal('show')
                $("#errorCode").html("Please check your input. " +
                    "<br/><br/>" + "Error Code: " + response.status)
            }
        })
        .then(function (data) {
            if (data) {
                currentWeather.name = data.name
                let latitude = data.coord.lat;
                let longitude = data.coord.lon;
                fetchcurrWeather(longitude, latitude);
                fetchForecast(longitude, latitude);
            }
        })
};

function fetchcurrWeather(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=hourly,daily,minutely,alerts&appid=" + api, {
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('error ' + response.status)
            }
        })
        .then(function (data) {
            if (data) {
                console.log(data)
                currentWeather.date = moment.unix(data.current.dt).format(momentFormat);
                currentWeather.temp = data.current.temp;
                currentWeather.wind = data.current.wind_speed;
                currentWeather.humidity = data.current.humidity;
                currentWeather.uvi = data.current.uvi;
                currentWeather.weatherIcon = data.current.weather[0].icon;
            }
            displayCurrWeather(currentWeather)
        })

}

function fetchForecast(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=6&units=metric&appid=" + api, {
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('error ' + response.status)

            }
        })
        .then(function (data) {
            if (data) {
                for (let index = 1; index < data.list.length; index++) {
                    let forecastData = new Object();
                    forecastData.date = moment.unix(data.list[index].dt).format(momentFormat);
                    forecastData.temp = data.list[index].temp.day;
                    forecastData.wind = data.list[index].speed;
                    forecastData.humidity = data.list[index].humidity;
                    forecastData.weatherIcon = data.list[index].weather[0].icon;
                    forecastWeather.push(forecastData)
                }
                displayForecast(forecastWeather)
            }
        })

}

function search() {
    let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.val() + "&units=metric&appid=" + api;
    currentWeatherDiv.innerHTML = "";
    fetchFunc(fetchURL);
}


function saveHistory() {
    //empty array of like 5
    //everytime search is pressed add to start of array
    //when more than 5 pop array
    //save json stringify
}


function displayCurrWeather(curr) {
    console.log("display current");
    console.log(curr);

    let pEl = $("#uviActual")
    $("#currWHead").text(curr.name + ", " + curr.date);
    $("#currWTemp").text("Temp: " + curr.temp + " celsius");
    $("#currWWind").text("Wind: " + curr.wind + " meter/sec");
    $("#currWHumidity").text("Humidity: " + curr.humidity + "%");
    $("#uviLabel").text("UV Index: ")
    if (curr.uvi < 2) {
        pEl.css({ "background-color": "#99FF99" })
    } else if (curr.uvi < 5) {
        pEl.css({ "background-color": "#FFFF00" })
    } else if (curr.uvi < 7) {
        pEl.css({ "background-color": "#b05441" })
    } else {
        pEl.css({ "background-color": "#8648bd" })
    }
    pEl.text(curr.uvi);
    pEl.css({ "padding-left": "3px", "padding-right": "3px" });
}

function displayForecast(forecast) {
    console.log("display forecast")
    console.log(forecast)
    $("#forecastedWeather")
}

// createPlaceholders();

searchBtn.click(search)
//formatting
//weather icons: 
//https://openweathermap.org/weather-conditions