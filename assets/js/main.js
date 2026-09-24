(function () {
  document.documentElement.classList.remove("no-js");

  // one player at a time
  document.addEventListener("play", function (e) {
    if (e.target && e.target.tagName === "AUDIO") {
      document.querySelectorAll("audio").forEach(function (a) { if (a !== e.target) a.pause(); });
    }
  }, true);

  // example carousels: one scene at a time, arrows + dots
  document.querySelectorAll(".examples-carousel").forEach(function (car) {
    var cards = car.querySelectorAll(".carousel-stage > .scenario-card");
    if (!cards.length) return;
    var i = 0;
    var dots = car.querySelector(".examples-dots");
    var counter = car.querySelector(".examples-header-counter");
    var title = car.querySelector(".examples-header-scale");
    var dotEls = [];
    cards.forEach(function (c, k) {
      var d = document.createElement("button");
      d.type = "button"; d.className = "ex-dot"; d.setAttribute("role", "tab");
      d.setAttribute("aria-label", "Example " + (k + 1));
      d.addEventListener("click", function () { show(k); });
      dots.appendChild(d); dotEls.push(d);
    });
    function show(k) {
      i = (k + cards.length) % cards.length;
      cards.forEach(function (c, j) {
        c.classList.toggle("is-active", j === i);
        if (j !== i) c.querySelectorAll("audio").forEach(function (a) { a.pause(); });
      });
      dotEls.forEach(function (d, j) { d.classList.toggle("is-active", j === i); });
      if (counter) counter.innerHTML = "<strong>" + (i + 1) + "</strong> / " + cards.length;
      if (title) title.textContent = cards[i].getAttribute("data-title") || "";
    }
    car.querySelectorAll(".examples-arrow-prev").forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
    car.querySelectorAll(".examples-arrow-next").forEach(function (b) { b.addEventListener("click", function () { show(i + 1); }); });
    show(0);
  });

  // copy BibTeX
  var b = document.getElementById("copy-bibtex");
  if (b) b.addEventListener("click", function () {
    var t = document.getElementById("bibtex-content").textContent;
    function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1500); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () {});
  });
})();
