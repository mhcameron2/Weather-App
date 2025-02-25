function formatDate(timestamp) {
  let dayDateTime = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayDateTime.getDay()];
  let date = dayDateTime.getDate();
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
  let month = months[dayDateTime.getMonth()];
  let hours = dayDateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dayDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${date} ${month}, ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let dayDateTime = document.querySelector("#day-date-time");
  dayDateTime.innerHTML = formatDate(response.data.dt * 1000);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#header-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiKey = "d71a4b54dab7353d278293768b930126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(city) {
  let apiKey = "d71a4b54dab7353d278293768b930126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  search(cityInput.value);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#five-day-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index != 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="card forecast">
            <div class="card-body">
              <ul>
                <li class="day">${formatDay(forecastDay.dt)}</li>
                <li>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" class="forecast-icon" width="70" />
                </li>
                <li><span class="max-temp id="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span> <span class="min-temp" id="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span></li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);

search("Brisbane");
