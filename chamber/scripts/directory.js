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

// Fetch and display member data
const membersUrl = 'data/members.json';

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = ''; // Clear existing static content

    members.forEach(member => {
        const card = document.createElement('section');
        card.className = 'business-card';
        card.innerHTML = `
            <h2>${member.name}</h2>
            <p class="tagline">${member.tagline}</p>
            <div class="card-content">
                <div class="business-img-placeholder"><span></span></div>
                <div class="business-details">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url.replace('https://', '')}</a></p>
                </div>
            </div>`;
        directoryContainer.appendChild(card);
    });
}

getMembers();