document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile hamburger menu
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }

    // Grid/List toggle handlers
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const directoryContainer = document.getElementById('directory-container');

    if (gridViewBtn && listViewBtn && directoryContainer) {
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
    }

    // Set Last Modified dynamic text
    const lastModifiedEl = document.getElementById('last-modified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = "Last Modification: " + document.lastModified;
    }

    // Set dynamic copyright year
    const copyrightYearEl = document.querySelector('.copyright-year');
    if (copyrightYearEl) {
        copyrightYearEl.textContent = new Date().getFullYear();
    }


    // Fetch and display member data
    const membersUrl = 'data/members.json';

    async function getMembers() {
        try {
            const response = await fetch(membersUrl);
            if (response.ok) {
                const data = await response.json();
                displayMembers(data);
            } else {
                // Log the full response status and text for better debugging
                console.error(`Failed to fetch members.json: ${response.status} - ${response.statusText}`);
                throw new Error(`Failed to fetch members.json: ${response.status} - ${await response.text()}`);
            }
        } catch (error) {
            console.error('Error fetching or parsing members data:', error);
        }
    }

    function displayMembers(members) {
        if (!directoryContainer) {
            console.error('directoryContainer not found. Cannot display members.');
            return;
        }
        directoryContainer.innerHTML = ''; // Clear existing static content

        const membershipLevels = {
            1: 'Member',
            2: 'Silver',
            3: 'Gold'
        };

        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'business-card';

            const levelName = membershipLevels[member.membership_level] || 'Member';

            card.innerHTML = `
                <div class="membership-level" data-level="${member.membership_level}">
                    ${levelName}
                </div>
                <h2>${member.name}</h2>
                <p class="tagline">${member.tagline}</p>
                <div class="card-content">
                    <div class="business-img-placeholder">
                        <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" width="120" height="120">
                    </div>
                    <div class="business-details">
                        <p><strong>EMAIL:</strong> ${member.email}</p>
                        <p><strong>PHONE:</strong> ${member.phone}</p>
                        <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url.replace('https://', '')}</a></p>
                    </div>
                </div>`;
            directoryContainer.appendChild(card);
        });
    }

    // Only call getMembers if directoryContainer exists, as it's the target for content
    if (directoryContainer) {
        getMembers();
    }
});