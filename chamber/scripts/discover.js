async function loadDiscover() {
  const container = document.getElementById('discover-container');
  if (!container) return;

  try {
    const response = await fetch('./members.json');
    if (!response.ok) {
      throw new Error('Failed to load members.json');
    }
    const data = await response.json();
    const members = data.members || [];

    if (members.length === 0) {
      container.innerHTML = '<p class="loading-text">No businesses found.</p>';
      return;
    }

    container.innerHTML = '';

    members.forEach(member => {
      const card = document.createElement('article');
      card.className = 'discover-card';

      const badgeClass = member.membershipLevel === 'Gold' ? 'membership-gold' : 'membership-silver';

      card.innerHTML = `
        <div class="discover-card-header">
          <img src="${member.logo}" alt="${member.name} logo" class="discover-card-logo" loading="lazy" onerror="this.style.display='none'">
          <div>
            <h3 class="discover-card-name">${member.name}</h3>
            <span class="membership-badge ${badgeClass}">${member.membershipLevel} Member</span>
          </div>
        </div>
        <div class="discover-card-details">
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace("https://", "")}</a></p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Discover load failed:', error);
    container.innerHTML = '<p class="loading-text">Unable to load business details.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadDiscover);
