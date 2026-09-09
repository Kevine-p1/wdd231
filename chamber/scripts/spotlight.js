const spotlightContainer =
document.querySelector("#spotlights-container");

async function loadSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        const members =
            await response.json();

        const qualifiedMembers =
            members.filter(member =>
                member.membership === 2 ||
                member.membership === 3
            );

        const shuffled =
            qualifiedMembers.sort(
                () => 0.5 - Math.random()
            );

        const selected =
            shuffled.slice(0, 3);

        displaySpotlights(selected);

    }

    catch (error) {

        console.error(error);

    }
}

function displaySpotlights(members) {

    members.forEach(member => {

        const card =
            document.createElement("section");

        card.classList.add("spotlight-card");

        const level =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.innerHTML = `

            <h3>${member.name}</h3>

            <img
                src="${member.image}"
                alt="${member.name}"
                loading="lazy">

            <p>${member.phone}</p>

            <p>${member.address}</p>

            <p>${level}</p>

            <a href="${member.website}"
               target="_blank">
               Visit Website
            </a>

        `;

        spotlightContainer.appendChild(card);

    });
}

loadSpotlights();