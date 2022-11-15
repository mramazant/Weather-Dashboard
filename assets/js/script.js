//VARIABLE DECLERATIONS
var userInput = document.getElementById("user-input")
var userForm = document.getElementById("form-sbt")
var dayForecast = document.getElementById("current-forecast")

var weatherAPI = 
"http://api.openweathermap.org/data/2.5/forecast?";
var APIkey = 
"5fe44141691d9e8fa70ff348cd16290d"

//function is responsible for getting the lat/lon for the city passed
function fetchCoordinates(city){
    //this will make the call to get the coordinates for that city
var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";

 
var apiCall = rootEndpoint + "?q=" + city + "&appid" + APIkey;

 console.log = (apiCall)

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

// function renderCards()

//function is reponsible for making api call with the user search term
function fetchWeather(lat, lon){ 
    var apiCall = weatherAPI + 
    "lat=" + lat + 
    "&lon=" + lon + 
    "&units=imperial&" +  APIkey
    fetch(apiCall)
    .then(function (response) {
    return response.json();
})
    .then (function(data){
    //take the temp and lets display to the user as an h1
    var h1El = document.createElement("h1")
    h1El.textContent = data.list[0].main.temp;
    dayForecast.append(h1El);
   
    //append to DOM
});
};


// function renderDayForecast();


//this function is responsible for form submission by capturing user input
function handleFormSubmit(e) {
    e.preventDefault();
    var input = userInput.value

//make an api call with that search term and confirm
//data is sent back
    //fetchWeather(input)

    fetchCoordinates(input)
    
}



//EVENT LISTENERS

userForm.addEventListener("submit", handleFormSubmit);

//local storage

//create an empty array to that array

//push tahat value (name of the city)

// localStorage.setItem('cities', )
// localStorage.setItem("cities", )

//['austin', 'denver', 'seattle']

