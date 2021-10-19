console.log("js script connected")

//api key
let api = "36766f9ac5083f2ffedc325da251c95a"


//dom declaration
let searchBtn = $('#searchBtn')
let city = $('#searchInput')

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
            }
        })
        .then(function (data) {
            if (data) {
                console.log("data lon lat");
                console.log(data);
                let latitude = data.coord.lat;
                let longitude = data.coord.lon;
                console.log(data.coord.lon)
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&exclude=hourly,daily,minutely,alerts&appid=" + api, {
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
                            console.log("data info")
                            console.log(data);

                        }
                    })
                fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=5&units=metric&appid=" + api, {
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
                            console.log("data forecast")
                            console.log(data);

                        }
                    })

            }
        })
};

function search() {
    let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.val() + "&units=metric&appid=" + api;
    fetchFunc(fetchURL);
}

function saveHistory() {
    //empty array of like 5
    //everytime search is pressed add to start of array
    //when more than 5 pop array
    //save json stringify
}

searchBtn.click(search)

//formatting
//weather icons: 
//https://openweathermap.org/weather-conditions
//docs 
//https://openweathermap.org/current
//https://openweathermap.org/api/one-call-api
