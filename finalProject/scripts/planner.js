import { setupNavigation } from "./navigation.js";

setupNavigation();

const form = document.querySelector("#travel-form");
const destinationSelect = document.querySelector("#destination");
const travelStyleSelect = document.querySelector("#travel-style");
const savedPreference = document.querySelector("#saved-preference");
const yearElement = document.querySelector("#current-year");
const modifiedElement = document.querySelector("#last-modified");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}

async function loadDestinationOptions() {
    try {
        const response = await fetch("data/destinations.json");

        if (!response.ok) {
            throw new Error("Could not load destination options.");
        }

        const destinations = await response.json();

        destinationSelect.innerHTML += destinations.map((destination) => `
            <option value="${destination.name}">${destination.name}, ${destination.country}</option>
        `).join("");
    } catch (error) {
        destinationSelect.innerHTML += `<option value="">Destinations unavailable</option>`;
        console.error(error);
    }
}

function loadSavedPreference() {
    const preference = localStorage.getItem("eastAfricaTravelStyle");

    if (preference && travelStyleSelect) {
        travelStyleSelect.value = preference;
        savedPreference.textContent = `Saved preference: ${preference}`;
    } else {
        savedPreference.textContent = "No travel style preference saved yet.";
    }
}

if (travelStyleSelect) {
    travelStyleSelect.addEventListener("change", () => {
        localStorage.setItem("eastAfricaTravelStyle", travelStyleSelect.value);
        savedPreference.textContent = `Saved preference: ${travelStyleSelect.value}`;
    });
}

if (form) {
    form.addEventListener("submit", () => {
        localStorage.setItem("eastAfricaTravelStyle", travelStyleSelect.value);
    });
}

loadDestinationOptions();
loadSavedPreference();