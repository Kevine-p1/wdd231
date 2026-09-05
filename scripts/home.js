// ==========================================
// 1. COURSE DATA ARRAY
// ==========================================
const courses = [
    { subject: 'CSE', number: 110, title: 'Programming Building Blocks', credits: 3, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 3, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 3, completed: false },
    { subject: 'CSE', number: 310, title: 'Applied Programming', credits: 3, completed: false },
    { subject: 'WDD', number: 330, title: 'Frontend Web Development II', credits: 3, completed: false },
    { subject: 'CSE', number: 320, title: 'Programming with Data Structures', credits: 3, completed: false },
    { subject: 'WDD', number: 430, title: 'Full-Stack Web Development', credits: 3, completed: false }
];

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const courseContainer = document.getElementById('course-container');
const totalCreditsSpan = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('lastModified');
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');

// ==========================================
// 3. CURRENT FILTER STATE
// ==========================================
let currentFilter = 'all';

// ==========================================
// 4. CREATE COURSE CARD
// ==========================================
function createCourseCard(course) {
    return `
        <div class="course-card ${course.completed ? 'completed' : ''}">
            <div class="course-subject">${course.subject}</div>
            <div class="course-number">${course.number}</div>
            <h3 class="course-title">${course.title}</h3>
            <div class="course-credits">
                📚 ${course.credits} credit${course.credits !== 1 ? 's' : ''}
            </div>
            ${
                course.completed
                    ? '<div class="completion-badge">✅ Completed</div>'
                    : ''
            }
        </div>
    `;
}

// ==========================================
// 5. FILTER COURSES
// ==========================================
function filterCourses(subject) {
    return courses.filter(course => {
        if (subject === 'all') {
            return true;
        }

        return course.subject.toLowerCase() === subject.toLowerCase();
    });
}

// ==========================================
// 6. CALCULATE TOTAL CREDITS
// ==========================================
function calculateTotalCredits(coursesArray) {
    return coursesArray.reduce((total, course) => {
        return total + course.credits;
    }, 0);
}

// ==========================================
// 7. DISPLAY COURSES
// ==========================================
function displayCourses(filter = 'all') {
    currentFilter = filter;

    const filteredCourses = filterCourses(filter);

    const coursesHTML = filteredCourses
        .map(createCourseCard)
        .join('');

    // Safely update course container
    if (courseContainer) {
        courseContainer.innerHTML = coursesHTML;
    }

    // Update total credits
    const totalCredits = calculateTotalCredits(filteredCourses);

    if (totalCreditsSpan) {
        totalCreditsSpan.textContent = totalCredits;
    }

    // Highlight active filter button
    updateActiveButton();
}

// ==========================================
// 8. UPDATE ACTIVE BUTTON
// ==========================================
function updateActiveButton() {
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');

        if (filter === currentFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ==========================================
// 9. SETUP EVENT LISTENERS
// ==========================================
function setupEventListeners() {

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            if (filter) {
                displayCourses(filter);
            }
        });
    });

    // Mobile menu toggle
    if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('active');

        menuButton.setAttribute('aria-expanded', isOpen);

        menuButton.textContent = isOpen ? '✕' : '☰';
    });
}
}

// ==========================================
// 10. INITIALIZE PAGE
// ==========================================
function initializePage() {

    // Update current year
    if (currentYearSpan) {
        currentYearSpan.textContent =
            new Date().getFullYear();
    }

    // Update last modified date
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent =
            `Last Modified: ${document.lastModified}`;
    }

    // Show all courses initially
    displayCourses('all');

    // Setup button listeners
    setupEventListeners();
}

// ==========================================
// 11. START APP AFTER PAGE LOADS
// ==========================================
document.addEventListener(
    'DOMContentLoaded',
    initializePage
);