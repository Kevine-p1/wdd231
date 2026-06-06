import { places } from "../data/discover-data.mjs";

const container = document.querySelector("#discover-grid");

places.forEach((place, index) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.classList.add(`card-${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button>Learn More</button>
    `;

    container.appendChild(card);
});

const visitMessage = document.querySelector("#visitor-message");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const daysBetween =
        Math.floor((now - Number(lastVisit)) / 86400000);

    if (daysBetween < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        visitMessage.textContent =
            `You last visited ${daysBetween} ${daysBetween === 1 ? "day" : "days"} ago.`;
    }
}

localStorage.setItem("lastVisit", now);