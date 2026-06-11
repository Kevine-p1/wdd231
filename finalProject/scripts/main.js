import { setupNavigation } from "./navigation.js";
import { loadWeather } from "./weather.js";

setupNavigation();
loadWeather();

const yearElement = document.querySelector("#current-year");
const modifiedElement = document.querySelector("#last-modified");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}