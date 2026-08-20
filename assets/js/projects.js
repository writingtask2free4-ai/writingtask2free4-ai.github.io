// Loyihalar ro'yxatini projects.json fayldan o'qib, kartalar sifatida chizadi
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var containers = document.querySelectorAll("[data-projects]");
    if (!containers.length) return;

    fetch(getProjectsJsonPath())
      .then(function (res) { return res.json(); })
      .then(function (projects) {
        containers.forEach(function (container) {
          var limit = parseInt(container.getAttribute("data-limit"), 10);
          var list = limit ? projects.slice(0, limit) : projects;
          renderProjects(container, list);
        });
      })
      .catch(function (err) {
        console.error("Loyihalarni yuklab bo'lmadi:", err);
        containers.forEach(function (c) {
          c.innerHTML = '<p class="empty-state">Loyihalarni yuklashda xatolik yuz berdi.</p>';
        });
      });
  });

  function getProjectsJsonPath() {
    var path = window.location.pathname;
    if (path.indexOf("/projects/") !== -1) return "projects.json";
    return "projects/projects.json";
  }

  function renderProjects(container, projects) {
    if (!projects.length) {
      container.innerHTML = '<p class="empty-state">Hozircha loyihalar yo\'q. Tez orada qo\'shiladi!</p>';
      return;
    }
    container.innerHTML = projects.map(function (p) {
      var tech = (p.tech || []).map(function (t) { return '<span class="tag">' + escapeHtml(t) + "</span>"; }).join("");
      var img = p.image
        ? '<img src="' + escapeAttr(resolveImagePath(p.image)) + '" alt="' + escapeAttr(p.title) + ' skrinshoti">'
        : "";
      var links = "";
      if (p.github) links += '<a href="' + escapeAttr(p.github) + '" target="_blank" rel="noopener">GitHub →</a>';
      if (p.demo) links += '<a href="' + escapeAttr(p.demo) + '" target="_blank" rel="noopener">Demo →</a>';
      return (
        '<article class="card project-card">' +
        img +
        "<h3>" + escapeHtml(p.title) + "</h3>" +
        "<p>" + escapeHtml(p.description) + "</p>" +
        (tech ? '<div class="tags">' + tech + "</div>" : "") +
        (links ? '<div class="project-links">' + links + "</div>" : "") +
        "</article>"
      );
    }).join("");
  }

  function resolveImagePath(img) {
    if (/^https?:\/\//.test(img)) return img;
    var path = window.location.pathname;
    if (path.indexOf("/projects/") !== -1) return "../" + img;
    return img;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }
  function escapeAttr(str) { return escapeHtml(str); }
})();
