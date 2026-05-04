// main.js — directory interactions, fetch members.json, and UI toggles
const directoryEl = document.getElementById('directory');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const levelFilter = document.getElementById('levelFilter');
const searchInput = document.getElementById('searchInput');
const template = document.getElementById('member-card-template');
const yearEl = document.getElementById('year');
const lastModifiedEl = document.getElementById('lastModified');


let members = [];
let currentView = 'grid';


// set copyright year and last modified
yearEl.textContent = new Date().getFullYear();
lastModifiedEl.textContent = document.lastModified || 'unknown';


async function fetchMembers(){
try{
const resp = await fetch('/data/members.json');
if(!resp.ok) throw new Error('Failed to fetch members');
members = await resp.json();
renderMembers();
}catch(e){
directoryEl.innerHTML = `<p class="error">Error loading members: ${e.message}</p>`;
}
}