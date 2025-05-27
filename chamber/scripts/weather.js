const apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=16.7666&lon=-3.0026&exclude=minutely,hourly,alerts&units=imperial&appid=YOUR_API_KEY";

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    document.getElementById("current-weather").innerHTML = `
      <p>${data.current.temp}°F - ${data.current.weather[0].description}</p>
    `;
    const forecastEl = document.getElementById("forecast");
    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const date = new Date(day.dt * 1000);
      forecastEl.innerHTML += `<p>${date.toLocaleDateString(undefined, { weekday: 'long' })}: ${day.temp.day}°F</p>`;
    }
  });
