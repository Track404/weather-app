export default async function getWeather(locationInput) {
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
