const apiKey = '82f7e5a3ab38ba04671c94cdbf06ae11'; // Replace with your actual API key
const lat = 35.7525;
const lon = -120.6971;
const units = 'metric'; // Use 'imperial' for Fahrenheit

// URLs for current weather and 5-day forecast
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    document.getElementById('current-weather').textContent = `${data.main.temp} °C`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;
  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    // Extract forecasts for the next 3 days at 12:00 PM
    const forecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temp = forecast.main.temp;
      const description = forecast.weather[0].description;
      const icon = forecast.weather[0].icon;

      const forecastElement = document.createElement('div');
      forecastElement.innerHTML = `
        <h3>${day}</h3>
        <p>${temp} °C</p>
        <p>${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      `;
      forecastContainer.appendChild(forecastElement);
    });
  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
}

// Initialize weather data fetch
fetchWeather();
fetchForecast();
