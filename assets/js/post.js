// Bitta maqolani ochish: URL'dagi ?slug= parametriga qarab articles.json'dan
// ma'lumot va tegishli .md faylni yuklab, HTML'ga aylantiradi.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    var titleEl = document.getElementById("post-title");
    var metaEl = document.getElementById("post-meta");
    var bodyEl = document.getElementById("post-body");

    if (!slug) {
      showError("Maqola topilmadi.");
      return;
    }

    fetch("articles.json")
      .then(function (res) { return res.json(); })
      .then(function (articles) {
        var article = articles.find(function (a) { return a.slug === slug; });
        if (!article) {
          showError("Bunday maqola topilmadi.");
          return;
        }
        document.title = article.title + " — Maqolalar";
        titleEl.textContent = article.title;
        metaEl.textContent = formatDate(article.date) + (article.tags && article.tags.length ? " · " + article.tags.join(", ") : "");

        return fetch("posts/" + article.file)
          .then(function (res) {
            if (!res.ok) throw new Error("Fayl topilmadi: " + article.file);
            return res.text();
          })
          .then(function (markdown) {
            bodyEl.innerHTML = window.marked ? window.marked.parse(markdown) : "<pre>" + markdown + "</pre>";
          });
      })
      .catch(function (err) {
        console.error(err);
        showError("Maqolani yuklashda xatolik yuz berdi.");
      });

    function showError(msg) {
      titleEl.textContent = msg;
      bodyEl.innerHTML = '<p><a href="index.html">← Barcha maqolalarga qaytish</a></p>';
    }
  });

  function formatDate(dateStr) {
    var months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
    var d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }
})();
