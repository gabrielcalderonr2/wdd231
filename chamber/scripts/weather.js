const apiKey = 'cd19c64935e49959d56ac2fdb524bb39';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Miguel,US&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=San Miguel,US&appid=${apiKey}&units=metric`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    document.getElementById('current-temp').textContent = `${data.main.temp} °C`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
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
      const date =
