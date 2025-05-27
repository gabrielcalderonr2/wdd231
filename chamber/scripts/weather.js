const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=16.7666&lon=-3.0026&exclude=minutely,hourly,alerts&units=imperial&appid=b3945f9e-3ac4-11f0-89da-0242ac130006-b3945ff8-3ac4-11f0-89da-0242ac130006';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const currentTemp = data.current.temp;
    const description = data.current.weather[0].description;

    document.getElementById('current-weather').innerHTML = `
      <p>${currentTemp}°F</p>
      <p>${description}</p>
    `;

    const forecastDiv = document.getElementById('forecast');
    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const date = new Date(day.dt * 1000);
      forecastDiv.innerHTML += `<p>${date.toLocaleDateString(undefined, { weekday: 'long' })}: ${day.temp.day}°F</p>`;
    }
  })
  .catch(error => console.error('Weather fetch error:', error));
