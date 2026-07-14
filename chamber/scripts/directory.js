document.addEventListener('DOMContentLoaded', () => {
  // --- Select Elements ---
  const directoryContainer = document.getElementById("directory-container");
  const gridBtn = document.getElementById("grid-view-btn");
  const listBtn = document.getElementById("list-view-btn");
  const menuBtn = document.getElementById("menu-button");
  const primaryNav = document.getElementById("primary-nav");
  const themeToggle = document.getElementById("theme-toggle");

  // --- Render Cards ---
  function displayMembers(data) {
    directoryContainer.innerHTML = ""; // Clear loader text

    data.forEach(member => {
      const card = document.createElement("article");
      card.classList.add("business-card");

      card.innerHTML = `
        <div class="card-header">
          <h3>${member.name}</h3>
          <p class="card-tagline">${member.tagline || member.membershipLevel + ' Member'}</p>
        </div>
        <div class="card-content">
          <img src="${member.logo}" alt="${member.name} Logo" class="card-logo" loading="lazy" onerror="this.style.display='none'">
          <div class="card-details">
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace("https://", "")}</a></p>
          </div>
        </div>
      `;
      directoryContainer.appendChild(card);
    });
  }

  // --- Fetch Data ---
  async function getMembers() {
    try {
      const response = await fetch('scripts/members.json');
      if (response.ok) {
        const data = await response.json();
        displayMembers(data.members);
      } else {
        throw new Error('Failed to fetch member data.');
      }
    } catch (error) {
      console.error(error);
      directoryContainer.innerHTML = `<p>Error loading directory. Please try again later.</p>`;
    }
  }

  // --- Toggle Layout Views ---
  gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-layout");
    directoryContainer.classList.remove("list-layout");
    gridBtn.classList.add("active-toggle");
    listBtn.classList.remove("active-toggle");
  });

  listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-layout");
    directoryContainer.classList.remove("grid-layout");
    listBtn.classList.add("active-toggle");
    gridBtn.classList.remove("active-toggle");
  });

  // --- Responsive Menu Toggle ---
  menuBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("active");
  });

  // --- Dark/Light Theme Engine ---
  const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  });

  // --- Info Footer Setup ---
  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent = document.lastModified;

  // Init render
  getMembers();
});