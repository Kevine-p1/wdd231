const apiKey = "c4c59b90065fa8ad258d5235827649a5";

const lat = -1.9441;
const lon = 30.0619;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {

    try {

        const response =
            await fetch(forecastURL);

        const data =
            await response.json();

        displayWeather(data);

    }

    catch(error) {

        console.error(error);

    }

}

function displayWeather(data) {

    const current =
    document.querySelector("#current-weather");

    current.innerHTML = `

        <p>
            <strong>
            ${Math.round(data.list[0].main.temp)}°C
            </strong>
        </p>

        <p>
            ${data.list[0].weather[0].description}
        </p>

    `;

    const forecast =
    document.querySelector("#forecast");

    forecast.innerHTML = "";

    const dayIndexes = [8,16,24];

    dayIndexes.forEach(index => {

        const forecastDate =
        new Date(data.list[index].dt_txt);

        const dayName =
        forecastDate.toLocaleDateString(
            "en-US",
            { weekday: "long" }
        );

        forecast.innerHTML += `

            <p>
                ${dayName}:
                ${Math.round(data.list[index].main.temp)}°C
            </p>

        `;

    });

}

getWeather();