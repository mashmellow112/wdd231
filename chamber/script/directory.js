document.addEventListener('DOMContentLoaded', () => {
    // Grid/List toggle handlers
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const directoryContainer = document.getElementById('directory-container');
    
    if (gridViewBtn && listViewBtn && directoryContainer) {
        gridViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('grid-layout');
            directoryContainer.classList.remove('list-layout');
            gridViewBtn.classList.add('active-view');
            listViewBtn.classList.remove('active-view');
        });
        
        listViewBtn.addEventListener('click', () => {
            directoryContainer.classList.add('list-layout');
            directoryContainer.classList.remove('grid-layout');
            listViewBtn.classList.add('active-view');
            gridViewBtn.classList.remove('active-view');
        });
    }
    
    // Fetch and display member data
    const membersUrl = 'data/members.json'; // Relative path to data folder
    
    async function getMembers() {
        try {
            const response = await fetch(membersUrl);
            if (response.ok) {
                const data = await response.json();
                displayMembers(data.members);
            } else {
                throw new Error('Failed to fetch member data.');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    function displayMembers(members) {
        directoryContainer.innerHTML = ''; // Clear existing static content
        
        members.forEach(member => {
            const card = document.createElement('section');
            card.className = 'card business-card';
            
            card.innerHTML = `
                <h2>${member.name}</h2>
                <img src="${member.logo}" alt="${member.name} Logo" loading="lazy" width="120" height="auto">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                <span class="badge badge-${member.membershipLevel.toLowerCase()}">${member.membershipLevel}</span>
            `;
            directoryContainer.appendChild(card);
        });
    }
    
    getMembers();
});