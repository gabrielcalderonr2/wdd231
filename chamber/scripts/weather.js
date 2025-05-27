const apiKey = 'cd19c64935e49959d56ac2fdb524bb39';
const city = 'San%20Miguel';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=San%20Miguel,US&appid=cd19c64935e49959d56ac2fdb524bb39';

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    document.getElementById('current-temp').textContent = `${temperature}°C`;
    document.getElementById('weather-desc').textContent = description;
  })
  .catch(error => console.error('Error fetching current weather:', error));
