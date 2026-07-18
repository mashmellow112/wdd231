async function loadSpotlights() {
  const grid = document.getElementById('spotlight-grid');
  if (!grid) return;

  try {
      const response = await fetch('./members.json');
    if (!response.ok) {
      throw new Error('Failed to load members.json');
    }
    const data = await response.json();
    const members = data.members || [];

    const eligible = members.filter(m =>
      m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver'
    );

    if (eligible.length === 0) {
      grid.innerHTML = '<p class="loading-text">No featured members available.</p>';
      return;
    }

    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    grid.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('article');
      card.className = 'spotlight-card';

      const badgeClass = member.membershipLevel === 'Gold' ? 'membership-gold' : 'membership-silver';

      card.innerHTML = `
        <div class="spotlight-header">
          <img src="${member.logo}" alt="${member.name} logo" class="spotlight-logo" loading="lazy" onerror="this.style.display='none'">
          <div>
            <h4 class="spotlight-name">${member.name}</h4>
            <span class="membership-badge ${badgeClass}">${member.membershipLevel}</span>
          </div>
        </div>
        <div class="spotlight-details">
          <p>📍 ${member.address}</p>
          <p>📞 ${member.phone}</p>
          <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Spotlight load failed:', error);
    grid.innerHTML = '<p class="loading-text">Unable to load spotlights.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);
