import { setupNavigation } from "./navigation.js";

setupNavigation();

const destinationGrid = document.querySelector("#destination-grid");
const countryFilter = document.querySelector("#country-filter");
const typeFilter = document.querySelector("#type-filter");
const seasonFilter = document.querySelector("#season-filter");
const modal = document.querySelector("#destination-modal");
const modalBody = document.querySelector("#modal-body");
const closeModalButton = document.querySelector("#close-modal");
const yearElement = document.querySelector("#current-year");
const modifiedElement = document.querySelector("#last-modified");

let destinations = [];

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}

async function getDestinations() {
    try {
        const response = await fetch("data/destinations.json");

        if (!response.ok) {
            throw new Error("Destination data could not be loaded.");
        }

        destinations = await response.json();
        populateFilters(destinations);
        displayDestinations(destinations);
    } catch (error) {
        destinationGrid.innerHTML = `
            <p class="error-message">Destination information is temporarily unavailable.</p>
        `;
        console.error(error);
    }
}

function populateFilters(items) {
    const countries = [...new Set(items.map((item) => item.country))].sort();
    const types = [...new Set(items.map((item) => item.type))].sort();
    const seasons = [...new Set(items.map((item) => item.season))].sort();

    countryFilter.innerHTML += countries.map((country) => `<option value="${country}">${country}</option>`).join("");
    typeFilter.innerHTML += types.map((type) => `<option value="${type}">${type}</option>`).join("");
    seasonFilter.innerHTML += seasons.map((season) => `<option value="${season}">${season}</option>`).join("");
}

function displayDestinations(items) {
    if (!items.length) {
        destinationGrid.innerHTML = `<p>No destinations match your selected filters.</p>`;
        return;
    }

    destinationGrid.innerHTML = items.map((destination) => `
        <article class="card destination-card">
            <img src="${destination.image}" alt="${destination.name} in ${destination.country}" width="400" height="250" loading="lazy">
            <div class="card-content">
                <span class="tag">${destination.type}</span>
                <h3>${destination.name}</h3>
                <div class="destination-meta">
                    <span><strong>Country:</strong> ${destination.country}</span>
                    <span><strong>Best Season:</strong> ${destination.season}</span>
                    <span><strong>Travel Type:</strong> ${destination.type}</span>
                </div>
                <p>${destination.description}</p>
                <div class="destination-actions">
                    <button class="button details-button" type="button" data-id="${destination.id}">
                        View Details
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    document.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const selectedDestination = destinations.find((destination) => destination.id === id);
            openDestinationModal(selectedDestination);
        });
    });
}

function filterDestinations() {
    const selectedCountry = countryFilter.value;
    const selectedType = typeFilter.value;
    const selectedSeason = seasonFilter.value;

    const filtered = destinations.filter((destination) => {
        const matchesCountry = selectedCountry === "all" || destination.country === selectedCountry;
        const matchesType = selectedType === "all" || destination.type === selectedType;
        const matchesSeason = selectedSeason === "all" || destination.season === selectedSeason;

        return matchesCountry && matchesType && matchesSeason;
    });

    displayDestinations(filtered);
}

function openDestinationModal(destination) {
    if (!destination || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <h2>${destination.name}</h2>
        <p><strong>Country:</strong> ${destination.country}</p>
        <p><strong>Destination Type:</strong> ${destination.type}</p>
        <p><strong>Best Season:</strong> ${destination.season}</p>
        <p>${destination.description}</p>
    `;

    modal.showModal();
    closeModalButton.focus();
}

[countryFilter, typeFilter, seasonFilter].forEach((filter) => {
    filter.addEventListener("change", filterDestinations);
});

if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
        modal.close();
    });
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

getDestinations();