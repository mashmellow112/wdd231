const lat = 0.3476;
const lon = 32.5825;
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;

const wmoCodes = {
  0: { desc: 'Clear sky', icon: '☀️' },
  1: { desc: 'Mainly clear', icon: '🌤️' },
  2: { desc: 'Partly cloudy', icon: '⛅' },
  3: { desc: 'Overcast', icon: '☁️' },
  45: { desc: 'Fog', icon: '🌫️' },
  48: { desc: 'Depositing rime fog', icon: '🌫️' },
  51: { desc: 'Light drizzle', icon: '🌦️' },
  53: { desc: 'Moderate drizzle', icon: '🌦️' },
  55: { desc: 'Dense drizzle', icon: '🌧️' },
  61: { desc: 'Slight rain', icon: '🌧️' },
  63: { desc: 'Moderate rain', icon: '🌧️' },
  65: { desc: 'Heavy rain', icon: '🌧️' },
  71: { desc: 'Slight snow', icon: '🌨️' },
  73: { desc: 'Moderate snow', icon: '🌨️' },
  75: { desc: 'Heavy snow', icon: '❄️' },
  80: { desc: 'Slight rain showers', icon: '🌦️' },
  81: { desc: 'Moderate rain showers', icon: '🌧️' },
  82: { desc: 'Violent rain showers', icon: '⛈️' },
  95: { desc: 'Thunderstorm', icon: '⛈️' },
  96: { desc: 'Thunderstorm with hail', icon: '⛈️' },
  99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️' }
};

function getWeatherInfo(code) {
  return wmoCodes[code] || { desc: 'Unknown', icon: '❓' };
}

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    displayCurrentWeather(data.current_weather);
    displayForecast(data.daily);
  } catch (error) {
    console.error('Weather fetch failed:', error);
    document.getElementById('current-temp').textContent = '--';
    document.getElementById('weather-desc').textContent = 'Weather unavailable';
    document.getElementById('forecast-container').innerHTML = '<p class="loading-text">Forecast unavailable</p>';
  }
}

function displayCurrentWeather(current) {
  const tempEl = document.getElementById('current-temp');
  const descEl = document.getElementById('weather-desc');
  const iconEl = document.getElementById('weather-icon');

  tempEl.textContent = Math.round(current.temperature);
  const info = getWeatherInfo(current.weathercode);
  descEl.textContent = info.desc;
  iconEl.setAttribute('alt', info.desc);
  iconEl.textContent = info.icon;
  iconEl.style.fontSize = '64px';
  iconEl.style.lineHeight = '1';
}

function displayForecast(daily) {
  const container = document.getElementById('forecast-container');
  container.innerHTML = '';

  const today = new Date(daily.time[0]).toDateString();

  for (let i = 1; i <= 3 && i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);
    const info = getWeatherInfo(daily.weathercode[i]);

    const dayEl = document.createElement('div');
    dayEl.className = 'forecast-day';
    dayEl.innerHTML = `
      <span class="day-label">${dayName}</span>
      <span class="day-icon" aria-hidden="true" style="font-size: 2rem; line-height: 1;">${info.icon}</span>
      <span class="day-temp">${maxTemp}° / ${minTemp}°</span>
    `;
    container.appendChild(dayEl);
  }
}

fetchWeather();
