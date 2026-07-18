document.addEventListener('DOMContentLoaded', () => {
  const directoryContainer = document.getElementById("directory-container");
  const gridBtn = document.getElementById("grid-view-btn");
  const listBtn = document.getElementById("list-view-btn");
  const searchInput = document.getElementById("member-search");

  let allMembers = [];

  function displayMembers(data) {
    allMembers = data || [];
    renderMembers(allMembers);
  }

  function renderMembers(data) {
    directoryContainer.innerHTML = "";

    if (!data || data.length === 0) {
      directoryContainer.innerHTML = `<p class="loading-text">No members found.</p>`;
      return;
    }

    data.forEach(member => {
      const card = document.createElement("article");
      card.classList.add("business-card");

      const badgeClass = member.membershipLevel === 'Gold' ? 'membership-gold' : 'membership-silver';

      card.innerHTML = `
        <div class="card-header">
          <h3>${member.name}</h3>
          <span class="membership-badge ${badgeClass}">${member.membershipLevel} Member</span>
        </div>
        <div class="card-content">
          <img src="${member.logo}" alt="${member.name} Logo" class="card-logo" loading="lazy" onerror="this.style.display='none'">
          <div class="card-details">
            <p><strong>ADDRESS:</strong> ${member.address}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace("https://", "")}</a></p>
          </div>
        </div>
      `;
      directoryContainer.appendChild(card);
    });
  }

  async function getMembers() {
    try {
      const response = await fetch('./members.json');
      if (response.ok) {
        const data = await response.json();
        displayMembers(data.members);
      } else {
        throw new Error('Failed to fetch member data.');
      }
    } catch (error) {
      console.error(error);
      directoryContainer.innerHTML = `<p class="loading-text">Error loading directory. Please try again later.</p>`;
    }
  }

  gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-layout");
    directoryContainer.classList.remove("list-layout");
    gridBtn.classList.add("active-toggle");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.classList.remove("active-toggle");
    listBtn.setAttribute("aria-pressed", "false");
  });

  listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-layout");
    directoryContainer.classList.remove("grid-layout");
    listBtn.classList.add("active-toggle");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.classList.remove("active-toggle");
    gridBtn.setAttribute("aria-pressed", "false");
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderMembers(allMembers);
      return;
    }
    const filtered = allMembers.filter(member =>
      member.name.toLowerCase().includes(query) ||
      member.address.toLowerCase().includes(query) ||
      member.membershipLevel.toLowerCase().includes(query)
    );
    renderMembers(filtered);
  });

  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent = document.lastModified;

  getMembers();
});
