console.log("js script connected")

let api = "36766f9ac5083f2ffedc325da251c95a"


//dom declaration
let searchBtn = $('#searchBtn')
let city = $('#searchInput')

function loadHistory() {
    //parse json
    //render into search
}

function search() {
    let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.val() + "&units=metric&appid=" + api;
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
                console.log(data);
                console.log(data.main.temp)
                console.log(data.wind.speed)
                console.log(data.main.humidity)
            }
        })
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
