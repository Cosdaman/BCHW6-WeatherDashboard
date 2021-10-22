console.log("js script connected")

//api key
let api = "36766f9ac5083f2ffedc325da251c95a"


//dom declaration
let searchBtn = $('#searchBtn')
let city = $('#searchInput')
let currentWeatherDiv = $("#currentWeather");
let searchHistoryDiv = $("#searchHistory");

//variable declarations
let currentWeather = new Object();
let forecastWeather = [];
let momentFormat = "MMM DD, YYYY"
let searchHistory = [];


//loads history from local storage 
function loadHistory() {
    var localStoredHistory = JSON.parse(localStorage.getItem("searchHistoryLocal"));
    if (localStoredHistory !== null) {
        searchHistory = localStoredHistory
    }

    for (let index = 0; index < searchHistory.length; index++) {
        let buttonEl = $("<button>");
        buttonEl.addClass("btn btn-outline-secondary historyBtn");
        buttonEl.text(searchHistory[index]);
        buttonEl.attr("value", searchHistory[index]);
        searchHistoryDiv.append(buttonEl);
    }

    let historyBtnArr = $(".historyBtn");
    historyBtnArr.click(historyBtnClick);

}

function historyBtnClick() {
    search(this.value);
}

function prepURL() {
    search(city.val());
}

function search(cityName) {
    let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + api;
    $("#forecastedWeather").html("");
    fetchFunc(fetchURL);
}

function fetchFunc(fetchURL) {
    fetch(fetchURL, {
    })
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log('error ' + response.status)
                $('#modal').modal('show')
                $("#errorCode").html("Please check your input. " +
                    "<br/><br/>" + "Error Code: " + response.status)
            }
        })
        .then(function (data) {
            if (data) {
                saveHistory(data.name)
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
                forecastWeather = [];
            }
        })

}



//saves last 5 searches to localstorage
function saveHistory(x) {
    if (searchHistory.indexOf(x) == -1) {
        searchHistory.unshift(x);
    }

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    localStorage.setItem("searchHistoryLocal", JSON.stringify(searchHistory));
    $("#searchHistory").html("");
    loadHistory();
}

//displays current weather
function displayCurrWeather(curr) {

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


//displays forecast
function displayForecast(forecast) {
    for (let index = 0; index < forecast.length; index++) {
        let divEl = $("<div>");
        divEl.addClass("col forecast")
        let hEl = $("<h3>");
        hEl.addClass("fs-4");
        hEl.text(moment(forecast[index].date, momentFormat).format("M-DD-YY"));
        $("#forecastedWeather").append(divEl);
        divEl.append(hEl);
        divEl.append($("<p>").text("Temp: " + forecast[index].temp + " celsius"));
        divEl.append($("<p>").text("Wind: " + forecast[index].wind + " meter/sec"));
        divEl.append($("<p>").text("Humidity: " + forecast[index].humidity + "%"));
    }
}

loadHistory();
searchBtn.click(prepURL)


//formatting
//weather icons: 
//https://openweathermap.org/weather-conditions