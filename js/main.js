const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a, .footer-links a")];
const revealElements = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");
const yearTarget = document.querySelector("#current-year");
const rotator = document.querySelector(".hero-rotator");
const contactForm = document.querySelector("#contact-form");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (rotator) {
  const roles = rotator.dataset.roles
    .split("|")
    .map((value) => value.trim())
    .filter(Boolean);

  if (roles.length > 1) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % roles.length;
      rotator.textContent = roles[index];
    }, 2200);
  }
}

if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

if (progressBars.length) {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width || "0%";
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.35 });

  progressBars.forEach((bar) => progressObserver.observe(bar));
}

const sectionIds = ["home-section", "about-section", "resume-section", "project-section", "contact-section"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length) {
  const headerOffset = 120;

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + headerOffset;
    let currentId = sectionIds[0];

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    document.querySelectorAll(".site-nav a").forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const bodyContent = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n");

    window.location.href = `mailto:gadgeathu07@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
  });
}
