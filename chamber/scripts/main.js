document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.getElementById("primary-nav");

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
      navMenu.classList.toggle("active");
    });
  }
});
