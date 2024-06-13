import "./style.css";
import "normalize.css";

const getWeatherButton = document.querySelector("#showWeatherButton");

async function getWeather(locationInput) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=eff864e84f864aa78a685523240806&q=${locationInput}&days=5`,
      { mode: "cors" }
    );
    let weather = await response.json();

    return weather;
  } catch (error) {
    alert(error);
  }
}

async function wheaterInfoNow(locationInput) {
  try {
    let info = await getWeather(locationInput);

    let tempCelsius = info.current.temp_c;
    let tempFahrenheit = info.current.temp_f;
    let location = info.location.name;
    let icon = info.current.condition.icon;

    return { tempCelsius, tempFahrenheit, location, icon };
  } catch (error) {
    alert(error);
  }
}

async function weatherInfoForecast(locationInput) {
  let forecastArray = [];
  try {
    let info = await getWeather(locationInput);
    for (let i = 0; i < info.forecast.forecastday.length; i++) {
      let tempCelsius = info.forecast.forecastday[i].day.avgtemp_c;
      let tempFahrenheit = info.forecast.forecastday[i].day.avgtemp_f;

      let icon = info.forecast.forecastday[i].day.condition.icon;
      forecastArray.push({ tempCelsius, tempFahrenheit, icon });
    }

    return forecastArray;
  } catch (error) {
    alert(error);
  }
}

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

    newDiv.innerHTML = `<div>T(°C)${locationForecast[i].tempCelsius}</div><div> T(°F): ${locationForecast[i].tempFahrenheit}</div>`;
    img.src = locationForecast[i].icon;
    newDiv.appendChild(img);
    forecastWeather.appendChild(newDiv);
  }

  //delete value from user input
  locationInput.value = "";
});
