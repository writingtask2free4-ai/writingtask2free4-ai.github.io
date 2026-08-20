// Maqolalar ro'yxatini articles.json fayldan o'qib, kartalar sifatida chizadi
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var containers = document.querySelectorAll("[data-articles]");
    if (!containers.length) return;

    fetch(getArticlesJsonPath())
      .then(function (res) { return res.json(); })
      .then(function (articles) {
        articles.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        containers.forEach(function (container) {
          var limit = parseInt(container.getAttribute("data-limit"), 10);
          var list = limit ? articles.slice(0, limit) : articles;
          renderArticles(container, list);
        });
      })
      .catch(function (err) {
        console.error("Maqolalarni yuklab bo'lmadi:", err);
        containers.forEach(function (c) {
          c.innerHTML = '<p class="empty-state">Maqolalarni yuklashda xatolik yuz berdi.</p>';
        });
      });
  });

  function getArticlesJsonPath() {
    // Sahifa joylashuviga qarab articles.json'ga to'g'ri yo'lni topadi
    var path = window.location.pathname;
    if (path.indexOf("/articles/") !== -1) return "articles.json";
    return "articles/articles.json";
  }

  function getArticleLinkPrefix() {
    var path = window.location.pathname;
    if (path.indexOf("/articles/") !== -1) return "post.html?slug=";
    return "articles/post.html?slug=";
  }

  function renderArticles(container, articles) {
    if (!articles.length) {
      container.innerHTML = '<p class="empty-state">Hozircha maqolalar yo\'q. Tez orada qo\'shiladi!</p>';
      return;
    }
    var prefix = getArticleLinkPrefix();
    container.innerHTML = articles.map(function (a) {
      var tags = (a.tags || []).map(function (t) { return '<span class="tag">' + escapeHtml(t) + "</span>"; }).join("");
      return (
        '<article class="card">' +
        '<div class="meta">' + formatDate(a.date) + "</div>" +
        "<h3><a href=\"" + prefix + encodeURIComponent(a.slug) + "\">" + escapeHtml(a.title) + "</a></h3>" +
        "<p>" + escapeHtml(a.description) + "</p>" +
        (tags ? '<div class="tags">' + tags + "</div>" : "") +
        "<a class=\"card-link\" href=\"" + prefix + encodeURIComponent(a.slug) + "\">O'qish →</a>" +
        "</article>"
      );
    }).join("");
  }

  function formatDate(dateStr) {
    var months = ["yan", "fev", "mar", "apr", "may", "iyun", "iyul", "avg", "sen", "okt", "noy", "dek"];
    var d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }

  window.__siteHelpers = { formatDate: formatDate, escapeHtml: escapeHtml };
})();
