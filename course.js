const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    },
    {
        subject: 'CSE',
        number: 270,
        title: 'Database Design and Development',
        credits: 2,
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle Mechanism
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.textContent = navMenu.classList.contains("open") ? "X" : "☰";
  });

  // Footer Dynamic Output Metrics
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

  // Course Dynamic Component Display Loop
  const courseContainer = document.getElementById("course-container");
  const creditSummary = document.getElementById("credit-summary");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderCourses(filter) {
    courseContainer.innerHTML = "";
    
    const filtered = courses.filter(course => {
      if (filter === "ALL") return true;
      return course.subject === filter;
    });

    filtered.forEach(course => {
      const card = document.createElement("div");
      card.className = "course-card";
      if (course.completed) {
        card.classList.add("completed");
      }
      card.textContent = `${course.subject} ${course.number}`;
      courseContainer.appendChild(card);
    });

    const totalCredits = filtered.reduce((acc, course) => acc + course.credits, 0);
    creditSummary.textContent = `The total credits for the courses listed is ${totalCredits}.`;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach(b => b.classList.remove("active"));
      const clickedButton = e.currentTarget;
      clickedButton.classList.add("active");
      const filterType = clickedButton.id.replace("btn-", "").toUpperCase();
      renderCourses(filterType);
    });
  });

  // Initial Load
  renderCourses("ALL");
});