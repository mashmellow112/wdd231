document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle Mechanism
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.getElementById("nav-menu");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      // Optional: Change button text/icon
      menuButton.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
    });
  }

  // Footer Dynamic Output Metrics
  const currentYearEl = document.getElementById('currentyear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  
  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
});