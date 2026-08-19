/* ============================================================
   Zota Furniture — trends blog
   Reading progress, active-heading table of contents, CTA
   reveal, and a no-backend newsletter form.
   Everything degrades gracefully if JS is unavailable.
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Reading progress bar (article pages) ---------- */

  var progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    var updateProgress = function () {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      progressBar.style.width = Math.min(Math.max(pct, 0), 100) + "%";
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- Smooth in-page anchors ---------- */
  // CSS `scroll-behavior: smooth` handles most browsers; this keeps focus
  // on the target so keyboard users land in the right place too.

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var hash = link.getAttribute("href");
      if (hash === "#") return;

      var target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      history.pushState(null, "", hash);
    });
  });

  /* ---------- Highlight the current section in the contents ---------- */

  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');

  if (tocLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    var headings = [];

    tocLinks.forEach(function (link) {
      var heading = document.querySelector(link.getAttribute("href"));
      if (!heading) return;
      linkFor[heading.id] = link;
      headings.push(heading);
    });

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkFor[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(function (other) {
              other.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    headings.forEach(function (heading) {
      spy.observe(heading);
    });
  }

  /* ---------- Reveal the newsletter block on scroll ---------- */

  var cta = document.querySelector(".cta");

  if (cta) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      cta.classList.add("is-visible");
    } else {
      var reveal = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          });
        },
        { threshold: 0.2 }
      );
      reveal.observe(cta);
    }
  }

  /* ---------- Newsletter form ---------- */
  // Static site: there is no mailing-list backend wired up yet, so we
  // confirm in place rather than navigating to a dead endpoint.

  var signup = document.querySelector(".signup");
  var signupNote = document.querySelector(".signup-note");

  if (signup && signupNote) {
    signup.addEventListener("submit", function (event) {
      event.preventDefault();
      var field = signup.querySelector('input[type="email"]');
      if (field && !field.checkValidity()) {
        field.reportValidity();
        return;
      }
      signupNote.textContent =
        "Thanks — you're on the list. Look out for the next Zota trend report.";
      signup.reset();
    });
  }

  /* ---------- Footer year ---------- */

  var yearSlot = document.getElementById("year");
  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }
})();
