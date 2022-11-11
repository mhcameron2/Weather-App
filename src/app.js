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

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let dayDateTime = document.querySelector("#day-date-time");
  dayDateTime.innerHTML = formatDate(response.data.dt * 1000);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "d71a4b54dab7353d278293768b930126";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Brisbane&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
