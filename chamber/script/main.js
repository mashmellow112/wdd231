document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle Mechanism
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.getElementById("nav-menu");
  const primaryNav = document.getElementById("primary-nav");

  if (menuButton && (navMenu || primaryNav)) {
    menuButton.addEventListener("click", () => {
      (navMenu || primaryNav).classList.toggle("active");
    });
  }
});