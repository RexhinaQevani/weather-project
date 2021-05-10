let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} ${date} ${month}`;
let h4 = document.querySelector("h4");
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
h4.innerHTML = `${hours}:${minutes}`;

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temp-today");
  tempElement.innerHTML = 21;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temp-today");
  tempElement.innerHTML = 77;
}
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertToCelsius);
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
let apiKey = "531a64fc7bab71506a1897c786ce4532";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
function searchCity(city) {
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector(".current-position");
currentPositionButton.addEventListener("click", getCurrentLocation);

searchCity("Verona");
