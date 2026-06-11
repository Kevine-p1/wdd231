const weatherCodeDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    80: "Rain showers",
    95: "Thunderstorm"
};

export async function loadWeather() {
    const weatherContainer = document.querySelector("#weather-data");

    if (!weatherContainer) return;

    const url = "https://api.open-meteo.com/v1/forecast?latitude=-1.95&longitude=30.06&current=temperature_2m,relative_humidity_2m,weather_code";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const data = await response.json();
        const current = data.current;
        const condition = weatherCodeDescriptions[current.weather_code] || "Weather information available";

        weatherContainer.innerHTML = `
            <ul class="weather-list">
                <li><strong>Temperature</strong> <span>${Math.round(current.temperature_2m)}°C</span></li>
                <li><strong>Condition</strong> <span>${condition}</span></li>
                <li><strong>Humidity</strong> <span>${current.relative_humidity_2m}%</span></li>
            </ul>
        `;
    } catch (error) {
        weatherContainer.innerHTML = `
            <p class="error-message">Kigali weather is temporarily unavailable. Please check again later.</p>
        `;
        console.error(error);
    }
}