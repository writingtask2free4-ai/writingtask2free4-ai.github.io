// Qorong'i/yorug' rejim almashtirish va mobil menyu — barcha sahifalarda ishlaydi
(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      updateIcon(toggle, initial);
      toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        var next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateIcon(toggle, next);
      });
    }

    var navToggle = document.getElementById("nav-toggle");
    var navLinks = document.getElementById("nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }
  });

  function updateIcon(btn, theme) {
    btn.textContent = theme === "dark" ? "☀" : "☾";
    btn.setAttribute("aria-label", theme === "dark" ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish");
  }
})();
