window.addEventListener(`load`, async () => {
    // get city location by IP
    const data = await queryAPI(`http://ip-api.com/json`);
    getCurrentWeather(data.city);
});

document.getElementById(`form`).addEventListener(`submit`, (e) => {
    getCurrentWeather(document.getElementById(`city`).value);
    e.preventDefault();
});

const queryAPI = async url => {
    return await fetch(url).then(data => data.json()).catch(e => { throw e });
}

const getCurrentWeather = async city => {
    document.getElementById(`output`).innerText = `Fetching data...`;
    const url = `http://api.weatherstack.com/current?access_key=e73fec16977c1f3a2de50ea8ad32e360&query=${city}`;
    const data = await queryAPI(url);
    document.getElementById(`city`).value = city;
    renderHTMLOutput(data);
}

const renderHTMLOutput = ({ request, current, error }) => {
    const template = !error ? `
        <h1>${request.query}</h1>
        <h2>${current.weather_descriptions[0]}</h2>
        <div class="tem">
            <img src="${current.weather_icons[0]}"
                alt="weather icon">
            <div>
                <h3>${current.temperature}<sup>°C</sup></h3>
                <p>feels like ${current.feelslike}</p>
            </div>
        </div>
        <ul>
            <li>Precipitation: ${current.precip}%</li>
            <li>Pressure: ${current.pressure}</li>
            <li>Humidity: ${current.humidity}</li>
            <li>Visibility: ${current.visibility}</li>
            <li>UV Index: ${current.uv_index}</li>
            <li>Wind Speed: ${current.wind_speed}</li>
            <li>Wind Degree: ${current.wind_degree}</li>
            <li>Wind Direction: ${current.wind_dir}</li>
        </ul>` : `Something went wrong...`;
    document.getElementById(`output`).innerHTML = template;
}