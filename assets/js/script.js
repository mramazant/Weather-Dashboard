//VARIABLE DECLERATIONS
var userInput = document.getElementById("user-input")
var userForm = document.getElementById("form-sbt")
// var dayForecast = document.getElementById("current-forecast")

var weatherAPI = 
"http://api.openweathermap.org/data/2.5/forecast?";
var APIkey = 
"5fe44141691d9e8fa70ff348cd16290d"

//function is responsible for getting the lat/lon for the city passed
function fetchCoordinates(city){
    //this will make the call to get the coordinates for that city
var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";

 
var apiCall = rootEndpoint + "?q=" + city + "&appid=" + APIkey;

 console.log(apiCall)

 fetch(apiCall)
 .then(function (response){
    return response.json();
 })
 .then(function (data){
    var lat = data[0].lat;
    var lon = data[0].lon;
   fetchWeather(lat, lon);

 })
}
//function is reponsible for making api call with the user search term
function fetchWeather(lat, lon){ 
    var apiCall = weatherAPI + 
    "lat=" + lat + 
    "&lon=" + lon + 
    "&units=imperial&appid=" +   APIkey
    fetch(apiCall)
    .then(function (response) {
    return response.json();
})
    .then (function(data){
    //take the temp and lets display to the user as an h1
    
    renderCards(data.list);
    //append to DOM
});
};
function renderCards(info) {
    // var h1El = document.createElement("h1")
    // h1El.textContent = info[0].main.temp;
    // dayForecast.append(h1El);
    console.log(info);
    renderDayForecast(1, info[0]);
    renderDayForecast(2, info[8]);
    renderDayForecast(3, info[16]);
    renderDayForecast(4, info[24]);
    renderDayForecast(5, info[32]);
    // var date = document.getElementById("date1")
    // var temperatur = document.getElementById("temp1")
    // var wind = document.getElementById("wind1")
    // var humidity = document.getElementById("humidity1")
    // temperatur.textContent = info[0].main.temp
    // date.textContent = info[0].dt_txt
    // wind.textContent = info[0].wind.speed
    // humidity.textContent = info[0].main.humidity
}
function renderDayForecast(forecastDay, data){
    var date = document.getElementById("date" + forecastDay)
    var temperatur = document.getElementById("temp" + forecastDay)
    var wind = document.getElementById("wind" + forecastDay)
    var humidity = document.getElementById("humidity" + forecastDay)
    var icon = document.getElementById("icon" + forecastDay)
    temperatur.textContent = data.main.temp
    date.textContent = data.dt_txt
    wind.textContent = data.wind.speed
    humidity.textContent = data.main.humidity
    // icon.textContent = data.weather.icon
};
//this function is responsible for form submission by capturing user input
function handleFormSubmit(e) {
    e.preventDefault();
    var input = userInput.value

//make an api call with that search term and confirm
//data is sent back
    //fetchWeather(input)

    fetchCoordinates(input);  
}

//EVENT LISTENERS

userForm.addEventListener("submit", handleFormSubmit);

var lastSearchButtons = document.getElementById("lastSearches")
function setLocalStorage(city){
for (i = 0; i<cities.length; i++){
    var cities = [];
    cities.push(city);
    localStorage.setItem("city", cities)
    var button = document.createElement("button");
    button.textContent = cities[i];
    lastSearchButtons.append(button);
    button.setAttribute("onclick", `renderCards("${cities[i]}")`)
}   
    lastSearchButtons.addEventListener("click", getLocalStorage);
    function getLocalStorage(){
        lastSearchButtons.textContent = localStorage.getItem("cities");
    }
};
    

//local storage

//create an empty array to that array

//push that value (name of the city)

// localStorage.setItem('cities', )
// localStorage.setItem("cities", )

//['austin', 'denver', 'seattle']

