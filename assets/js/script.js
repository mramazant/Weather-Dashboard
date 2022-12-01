//VARIABLE DECLERATIONS
var userInput = document.getElementById("user-input")
var userForm = document.getElementById("form-sbt")
var lastSearchButtons = document.getElementById("lastSearches")
var weatherAPI = 
"https://api.openweathermap.org/data/2.5/forecast?";
var APIkey = 
"5fe44141691d9e8fa70ff348cd16290d"
//function is responsible for getting the lat/lon for the city passed
function fetchCoordinates(city){
//this will make the call to get the coordinates for that city
var rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct"; 
var apiCall = rootEndpoint + "?q=" + city + "&appid=" + APIkey;
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
renderButtons();
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
    renderCards(data.list);
});
};
//getting informations from array
function renderCards(info) {
    renderDayForecast(1, info[0]);
    renderDayForecast(2, info[7]);
    renderDayForecast(3, info[15]);
    renderDayForecast(4, info[23]);
    renderDayForecast(5, info[31]);
    renderDayForecast(6, info[39]);
    document.getElementById("cityName");
}
function renderDayForecast(forecastDay, data){
    var date = document.getElementById("date" + forecastDay)
    var temperatur = document.getElementById("temp" + forecastDay)
    var wind = document.getElementById("wind" + forecastDay)
    var humidity = document.getElementById("humidity" + forecastDay)
    var icon = document.getElementById("icon" + forecastDay)
    var iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    icon.src = iconsrc
    temperatur.textContent = data.main.temp
    date.textContent = data.dt_txt
    wind.textContent = data.wind.speed
    humidity.textContent = data.main.humidity
};
//this function is responsible for form submission by capturing user input
function handleFormSubmit(e) {
    e.preventDefault();
    var input = userInput.value
    if (input) {
        fetchCoordinates(input);  
    setLocalStorage(input);
    }
}
//EVENT LISTENERS
userForm.addEventListener("submit", handleFormSubmit);
    function setLocalStorage(city){    
    var cities;
    cities = localStorage.getItem("city")   
    if (cities == null){
        cities = [];
    } else{
        cities = JSON.parse(cities)
    }
    cities.push(city);
    localStorage.setItem("city", JSON.stringify(cities))
    renderButtons();    
    }
    function clearRenderButtons (){
        lastSearchButtons.innerHTML = ""
    }
    function renderButtons () {
        var cities;
    cities = localStorage.getItem("city") 
    if (cities == null){
        cities = [];
    } else{
        cities = JSON.parse(cities)
    }
        clearRenderButtons();
for (i = 0; i<cities.length; i++){
//creating button for last searches
    var button = document.createElement("button");
    button.textContent = cities[i];
    button.addEventListener("click", (event)=> {
        fetchCoordinates(event.target.innerHTML)
    })
    lastSearchButtons.appendChild(button);
 }   
    }
