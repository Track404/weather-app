import "./style.css";
import "normalize.css";
import { wheaterInfoNow, weatherInfoForecast } from "./takeWeatherData";

const getWeatherButton = document.querySelector("#showWeatherButton");

getWeatherButton.addEventListener("click", async () => {
  const locationInput = document.querySelector("#location");
  const locationInfo = document.querySelector("#locationInfo");
  const forecastWeather = document.querySelector("#forecastWeather");

  //call function to get all weather info
  const locationChoise = await wheaterInfoNow(locationInput.value);
  const locationForecast = await weatherInfoForecast(locationInput.value);

  //Show current weather
  locationInfo.innerHTML = `<div id=city>${locationChoise.location}</div><div id=tempC> T(°C): ${locationChoise.tempCelsius}</div><div id=TempF> T(°F): ${locationChoise.tempFahrenheit}</div>`;
  const img = document.createElement("img");
  img.src = locationChoise.icon;
  locationInfo.appendChild(img);
  //Show forecast weather
  forecastWeather.innerHTML = "";
  for (let i = 0; i < locationForecast.length; i++) {
    const newDiv = document.createElement("div");
    const img = document.createElement("img");
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // convert date_epoch to readable date and choose day to display
    let date = new Date(locationForecast[i].date * 1000);
    console.log(date);
    let day = weekday[date.getDay()];

    newDiv.innerHTML = `<div>${day}</div><div>T(°C)${locationForecast[i].tempCelsius}</div><div> T(°F): ${locationForecast[i].tempFahrenheit}</div>`;
    img.src = locationForecast[i].icon;
    newDiv.appendChild(img);
    forecastWeather.appendChild(newDiv);
  }

  //delete value from user input
  locationInput.value = "";
});
