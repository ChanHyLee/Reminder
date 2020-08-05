const weather = document.querySelector(".js-weather");
const place = document.querySelector(".js-place");

const API_KEY = "bd397f3c3939dba36a7f14ca4b604e21";

const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json(); //then은 fetch 작업이 끝나길 기다린 후 실행된다.
    }).then(function(json) {
        const temperature = json.main.temp;
        const weatherLike = json.weather[0].main;
        const placeName = json.name;
        weather.innerText = `${temperature} degrees Celcius`;
        place.innerText = `🗺 ${placeName} ${weatherLike}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        /*Same as
        latitude: latitude,
        longitude: longitude
        */
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();
