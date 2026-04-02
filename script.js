let lastScrollY = window.scrollY;

const navbar = document.querySelector(".navbar-area");

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });

  const currentScrollY = window.scrollY;

  // Shadow effect (keep your existing logic)
  navbar.style.boxShadow =
    currentScrollY > 50
      ? "0 4px 20px rgba(0,0,0,0.1)"
      : "0 2px 10px rgba(0,0,0,0.1)";

  // Show navbar at top
  if (currentScrollY <= 0) {
    navbar.style.transform = "translateY(0)";
  }
  // Scrolling down → hide navbar
  else if (currentScrollY > lastScrollY) {
    navbar.style.transform = "translateY(-100%)";
  }
  // Scrolling up → show navbar
  else {
    navbar.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

window.onload = () => {
  document.getElementById("currentYear").innerText = new Date().getFullYear();
};

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelectorAll(".navbar .dropdown").forEach((dropdown) => {
  dropdown.addEventListener("mouseenter", function () {
    const menu = this.querySelector(".dropdown-menu");
    menu.classList.add("show");
  });

  dropdown.addEventListener("mouseleave", function () {
    const menu = this.querySelector(".dropdown-menu");
    menu.classList.remove("show");
  });
});
