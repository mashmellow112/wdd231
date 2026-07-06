// Toggle mobile hamburger menu
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuButton.classList.toggle('open');
});

// Grid/List toggle handlers
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const directoryContainer = document.getElementById('directory-container');

gridViewBtn.addEventListener('click', () => {
    directoryContainer.className = 'grid-layout';
    gridViewBtn.classList.add('active-view');
    listViewBtn.classList.remove('active-view');
});

listViewBtn.addEventListener('click', () => {
    directoryContainer.className = 'list-layout';
    listViewBtn.classList.add('active-view');
    gridViewBtn.classList.remove('active-view');
});

// Set Last Modified dynamic text
document.getElementById('last-modified').textContent = "Last Modification: " + document.lastModified;