/* Buscador/filtro del blog — vanilla JS, sin dependencias.
   Filtra las .card del grid por texto (título/resumen) y por categoría (data-cat).
   Progressive enhancement: si no hay JS, se ven todos los posts igual. */
(function () {
  "use strict";
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    var input = document.getElementById("blogSearch");
    var grid = document.getElementById("postGrid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var empty = document.getElementById("noResults");
    var activeCat = "";

    function apply() {
      var q = input ? norm(input.value.trim()) : "";
      var shown = 0;
      cards.forEach(function (c) {
        var hay = norm(c.getAttribute("data-title") + " " + (c.getAttribute("data-tags") || ""));
        var cat = c.getAttribute("data-cat") || "";
        var okText = !q || hay.indexOf(q) !== -1;
        var okCat = !activeCat || cat === activeCat;
        var show = okText && okCat;
        c.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (empty) empty.style.display = shown === 0 ? "block" : "none";
    }

    if (input) input.addEventListener("input", apply);

    // Filtro por categoría desde el sidebar: enlaces con data-filter="slug-categoria"
    document.querySelectorAll("[data-filter]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        // Solo filtra in-situ si estamos en una página con grilla (home del blog)
        e.preventDefault();
        var f = el.getAttribute("data-filter");
        activeCat = activeCat === f ? "" : f;
        document.querySelectorAll("[data-filter]").forEach(function (n) { n.classList.remove("active"); });
        if (activeCat) el.classList.add("active");
        apply();
      });
    });

    apply();
  });
})();
