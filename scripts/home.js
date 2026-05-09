// Courses array (modify completed status as needed)
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

// DOM Elements
const courseContainer = document.getElementById('course-container');
const totalCreditsSpan = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('lastModified');
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');

currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
menuButton.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

