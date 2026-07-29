const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");
const yearCopies = document.querySelectorAll(".year-copy");
const langButtons = document.querySelectorAll(".lang-btn[data-set-lang]");

function setLanguage(lang) {
  const target = lang === "zh" ? "zh" : "en";
  document.documentElement.lang = target === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-lang]").forEach((node) => {
    const nodeLang = node.getAttribute("data-lang");
    node.hidden = nodeLang !== target;
  });

  langButtons.forEach((btn) => {
    const pressed = btn.getAttribute("data-set-lang") === target;
    btn.setAttribute("aria-pressed", String(pressed));
  });

  localStorage.setItem("portfolio-lang", target);
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (yearCopies.length > 0 && yearNode?.textContent) {
  yearCopies.forEach((node) => {
    node.textContent = yearNode.textContent;
  });
}

const preferredLanguage = localStorage.getItem("portfolio-lang") || "en";
setLanguage(preferredLanguage);

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-set-lang") || "en";
    setLanguage(lang);
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("open");
    });
  });
}

const revealTargets = document.querySelectorAll(".section, .hero");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((node) => {
  node.classList.add("reveal");
  observer.observe(node);
});

// Progressive profile image: show the lightweight placeholder first, then
// swap to the high-resolution version once it has finished downloading.
(function progressiveProfileImage() {
  const img = document.getElementById("profile-img");
  if (!img) return;
  const full = img.getAttribute("data-full");
  if (!full) return;
  if (img.currentSrc && img.currentSrc.indexOf(full) !== -1) return;

  const hd = new Image();
  hd.decoding = "async";
  hd.onload = () => {
    const fadeIn = () => {
      img.style.opacity = "1";
      img.removeEventListener("load", fadeIn);
    };
    img.addEventListener("load", fadeIn);
    img.style.opacity = "0";
    img.src = full;
  };
  hd.src = full;
})();
