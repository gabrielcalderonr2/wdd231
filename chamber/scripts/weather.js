const apiKey = "cd19c64935e49959d56ac2fdb524bb39"; // Replace with your OpenWeatherMap API key
const lat = "35.7522";  // San Miguel, California
const lon = "-120.6979";

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // ---------- Current Weather ----------
    const currentTemp = Math.round(data.current.temp);
    const currentDesc = data.current.weather[0].description;
    const humidity = data.current.humidity;
    const sunrise = new Date(data.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById("current-temp").textContent = `${currentTemp}°F`;
    document.getElementById("weather-desc").textContent = capitalize(currentDesc);
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("sunrise").textContent = `Sunrise: ${sunrise}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunset}`;

    // ---------- 3-Day Forecast ----------
    const forecastContainer = document.getElementById("forecast");

    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const date = new Date(day.dt * 1000);
      const dayTemp = Math.round(day.temp.day);
      const desc = capitalize(day.weather[0].description);
      const forecastBox = document.createElement("div");

      forecastBox.innerHTML = `
        <strong>${date.toLocaleDateString(undefined, { weekday: 'long' })}</strong>: 
        ${dayTemp}°F, ${desc}
      `;
      forecastContainer.appendChild(forecastBox);
    }
  })
  .catch(error => console.error("Weather API error:", error));

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
