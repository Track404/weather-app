import getWeather from "./getDataFromApi";

export async function wheaterInfoNow(locationInput) {
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

export async function weatherInfoForecast(locationInput) {
  let forecastArray = [];
  try {
    let info = await getWeather(locationInput);
    for (let i = 0; i < info.forecast.forecastday.length; i++) {
      let tempCelsius = info.forecast.forecastday[i].day.avgtemp_c;
      let tempFahrenheit = info.forecast.forecastday[i].day.avgtemp_f;
      let date = info.forecast.forecastday[i].date_epoch;
      let icon = info.forecast.forecastday[i].day.condition.icon;
      forecastArray.push({ tempCelsius, tempFahrenheit, icon, date });
    }

    return forecastArray;
  } catch (error) {}
}
