// === WEATHER SECTION ===
const apiKey = 'b3945f9e-3ac4-11f0-89da-0242ac130006-b3945ff8-3ac4-11f0-89da-0242ac130006'; 
const city = 'San Miguel,SV';
const units = 'imperial';
const weatherContainer = document.getElementById('weather');

async function getWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
  );
  const data = await response.json();

  const current = data.list[0];
  const description = current.weather[0].description;
  const temp = Math.round(current.main.temp);

  const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

  weatherContainer.innerHTML = `
    <h2>Weather</h2>
    <p><strong>Today:</strong> ${description}, ${temp}°F</p>
    <h3>3-Day Forecast</h3>
    <ul>
      ${forecastDays.map(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        const forecastTemp = Math.round(day.main.temp);
        return `<li>${date}: ${forecastTemp}°F</li>`;
      }).join('')}
    </ul>
  `;
}
getWeather();


// === SPOTLIGHTS SECTION ===
const spotlightContainer = document.getElementById('spotlights');

async function loadSpotlights() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  // Filter gold and silver members
  const topMembers = members.filter(m =>
    m.membership === 'gold' || m.membership === 'silver'
  );

  // Shuffle and pick 2 or 3
  const selected = topMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

  spotlightContainer.innerHTML = `
    ${selected.map(member => `
      <div class="spotlight-card">
        <img src="${member.logo}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership">${member.membership.toUpperCase()} Member</p>
      </div>
    `).join('')}
  `;
}
loadSpotlights();

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('lastModified').textContent = document.lastModified;
});