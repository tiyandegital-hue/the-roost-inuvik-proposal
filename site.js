/* The Roost, Inuvik — shared behaviour. No frameworks, no trackers. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ONE swappable constant for the business identity */
  var ROOST = {
    name: "The Roost",
    address: "108 MacKenzie Rd",
    city: "Inuvik, NT X0E 0A5, Canada",
    phoneDisplay: "+1 867-777-2727",
    phoneHref: "tel:+18677772727",
    facebook: "https://www.facebook.com/theroost867/",
    instagram: "https://www.instagram.com/theroost867",
    tripadvisor: "https://www.tripadvisor.ca/Restaurant_Review-g499243-d764679-Reviews-The_Roost-Inuvik_Northwest_Territories.html"
  };
  window.ROOST = ROOST;

  /* hydrate placeholders: <span data-r="phoneDisplay"></span> etc. */
  function hydrate() {
    var els = document.querySelectorAll("[data-r]");
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute("data-r");
      if (ROOST[k] == null) continue;
      if (els[i].tagName === "A" && (k === "phoneHref" || k === "facebook" || k === "instagram" || k === "tripadvisor")) {
        els[i].setAttribute("href", ROOST[k]);
      } else {
        els[i].textContent = ROOST[k];
      }
    }
    var tel = document.querySelectorAll('a[href="tel:+18677772727"]');
    for (var j = 0; j < tel.length; j++) {
      if (!tel[j].textContent.trim()) tel[j].textContent = ROOST.phoneDisplay;
    }
  }

  /* mobile nav */
  function nav() {
    var btn = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* scroll reveals — content stays visible if JS fails (no .js = no hiding) */
  function reveals() {
    var els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window) || !els.length) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Emberfall: rising ember particles, canvas 2D, rAF, paused off-screen */
  function embers() {
    var cv = document.getElementById("ember-canvas");
    if (!cv) return;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = cv.getContext("2d");
    var W, H, parts = [], running = false, raf = 0;
    var MAX = 48;

    function size() {
      var r = cv.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(bottom) {
      return {
        x: Math.random() * W,
        y: bottom ? H + 8 : Math.random() * H,
        r: 0.8 + Math.random() * 2.4,
        vy: 0.35 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.4,
        a: 0.25 + Math.random() * 0.55,
        hue: 14 + Math.random() * 22
      };
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx + Math.sin(p.y * 0.02) * 0.25;
        if (p.y < -12) parts[i] = spawn(true);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = "hsla(" + p.hue + ", 88%, 56%, " + p.a + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    function start() {
      if (running || reduced) return;
      running = true; tick();
    }
    function stop() {
      running = false; cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, W, H);
    }
    size();
    for (var i = 0; i < MAX; i++) parts.push(spawn(false));
    window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
      }).observe(cv);
    } else { start(); }
    if (reduced) { /* static: draw one frame of settled embers */
      size();
      parts.forEach(function (p) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = "hsla(" + p.hue + ", 88%, 56%, " + (p.a * 0.6) + ")";
        ctx.fill();
      });
    }
  }

  /* specials flip board: click or keyboard toggles */
  function flips() {
    var cards = document.querySelectorAll(".flip");
    cards.forEach(function (c) {
      c.addEventListener("click", function () {
        c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") === "true" ? "false" : "true");
      });
    });
  }

  /* menu category spy */
  function spy() {
    var links = document.querySelectorAll(".cat-nav a");
    var secs = [];
    links.forEach(function (a) {
      var s = document.getElementById(a.getAttribute("href").slice(1));
      if (s) secs.push([a, s]);
    });
    if (!secs.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          secs.forEach(function (pair) { pair[0].removeAttribute("aria-current"); });
          var found = secs.filter(function (pair) { return pair[1] === en.target; })[0];
          if (found) found[0].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach(function (pair) { io.observe(pair[1]); });
  }

  hydrate(); nav(); reveals(); embers(); flips(); spy();
})();
