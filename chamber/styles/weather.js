// OpenWeatherMap Configuration
const apiKey = 'YOUR_API_KEY'; 
const lat = '0.4479'; 
const lon = '33.2032'; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch and render current weather
async function fetchCurrentWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error("Weather data fetch failed:", error);
  }
}

function displayCurrentWeather(data) {
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const weatherDesc = document.querySelector('#weather-desc');

  currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
  const iconCode = data.weather[0].icon;
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  
  // Title-case description
  const words = data.weather[0].description.split(" ");
  weatherDesc.textContent = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Fetch and render 3-day forecast
async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    }
  } catch (error) {
    console.error("Forecast data fetch failed:", error);
  }
}

function displayForecast(data) {
  const forecastContainer = document.querySelector('#forecast-container');
  forecastContainer.innerHTML = '';

  // OpenWeather Map /forecast returns 40 data points (every 3 hours for 5 days).
  // We filter to grab one point per day (e.g., at 12:00:00 PM).
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  // Slice down to exactly 3 days
  const threeDayForecast = dailyForecasts.slice(0, 3);

  threeDayForecast.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(day.main.temp);
    const iconCode = day.weather[0].icon;

    const forecastDay = document.createElement('div');
    forecastDay.className = 'forecast-day';
    forecastDay.innerHTML = `
      <span class="day-label">${dayName}</span>
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${day.weather[0].description}">
      <span class="day-temp">${temp}°F</span>
    `;
    forecastContainer.appendChild(forecastDay);
  });
}

// Initialize
fetchCurrentWeather();
fetchForecast();