export function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const nav = document.querySelector("#primary-nav");
    const navLinks = document.querySelectorAll("#primary-nav a");

    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        if (linkPath === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });
}