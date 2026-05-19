/* ============================================================
   NEMESIS - TOXIC COLLECTION
   Standalone JavaScript
   ============================================================ */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initGlitchTitle();
    initSectionCountsAndCollapse();
    initTotalSpecimenCounter();
    initSearchFilter();
    initPreviewCapsule();
    initBackToTop();
    initSectionIndexSmoothScroll();
    makePreviewCapsuleDraggable();
  });

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function textOf(node) {
    return node ? node.textContent.trim() : "";
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* ============================================================
     Glitch title
     ============================================================ */
  function initGlitchTitle() {
    var title = document.getElementById("glitch-title");
    if (!title) return;

    var raw = (title.textContent || "").trim();
    if (!raw) return;

    title.setAttribute("aria-label", raw);
    title.setAttribute("data-text", raw);
    title.classList.add("glitch-text");
    title.textContent = "";

    var fragment = document.createDocumentFragment();

    raw.split("").forEach(function (char) {
      var span = document.createElement("span");
      span.className = "glitch-char";
      span.textContent = char === " " ? "\u00A0" : char;
      fragment.appendChild(span);
    });

    title.appendChild(fragment);

    var chars = qsa(".glitch-char", title).filter(function (node) {
      return node.textContent && node.textContent.trim() !== "";
    });

    if (!chars.length) return;

    function triggerGlitch() {
      title.classList.add("old-school-flash");

      window.setTimeout(function () {
        title.classList.remove("old-school-flash");
      }, randomInt(180, 320));

      var total = randomInt(1, 3);

      for (var i = 0; i < total; i++) {
        var target = chars[randomInt(0, chars.length - 1)];
        if (!target) continue;

        target.classList.add("is-glitching");

        window.setTimeout(
          (function (node) {
            return function () {
              node.classList.remove("is-glitching");
            };
          })(target),
          randomInt(140, 320)
        );
      }
    }

    function scheduleNext() {
      window.setTimeout(function () {
        triggerGlitch();
        scheduleNext();
      }, randomInt(1200, 3200));
    }

    scheduleNext();
  }

  /* ============================================================
     Section counts + collapse
     ============================================================ */
  function initSectionCountsAndCollapse() {
    var sections = qsa(".collection-section");

    sections.forEach(function (section) {
      var header = qs(".collapsible-header", section);
      var content = qs(".collapsible-content", section);
      var cards = qsa(".pokemon-card", section);
      var arrow = qs(".arrow", header);

      if (!header || !content) return;

      var count = cards.length;
      var existingCount = qs(".poke-count", header);

      if (count > 0 && !existingCount) {
        var countTag = document.createElement("span");
        countTag.className = "poke-count";
        countTag.textContent = "(x" + count + ")";

        if (arrow) {
          header.insertBefore(countTag, arrow);
        } else {
          header.appendChild(countTag);
        }
      } else if (count > 0 && existingCount) {
        existingCount.textContent = "(x" + count + ")";
      }

      if (!header.hasAttribute("aria-expanded")) {
        header.setAttribute("aria-expanded", "true");
      }

      content.hidden = header.getAttribute("aria-expanded") !== "true";

      header.addEventListener("click", function () {
        var expanded = header.getAttribute("aria-expanded") === "true";
        header.setAttribute("aria-expanded", expanded ? "false" : "true");
        header.classList.toggle("is-collapsed", expanded);
        content.hidden = expanded;
      });
    });
  }

  /* ============================================================
     Total specimen counter
     ============================================================ */
  function initTotalSpecimenCounter() {
    var totalBtn = document.getElementById("total-pokemon-btn");
    if (!totalBtn) return;

    var total = qsa(".pokemon-card").length;
    var label = "Specimens registered: ";
    var durationMs = 2200;

    totalBtn.textContent = label + "0";

    if (total <= 0) return;

    var startTime = null;

    function animateCounter(timestamp) {
      if (startTime === null) startTime = timestamp;

      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / durationMs, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(total * eased);

      totalBtn.textContent = label + current;

      if (progress < 1) {
        window.requestAnimationFrame(animateCounter);
      } else {
        totalBtn.textContent = label + total;
      }
    }

    window.requestAnimationFrame(animateCounter);
  }

  /* ============================================================
     Search / filter
     ============================================================ */
  function initSearchFilter() {
    var input = document.getElementById("pokemon-search-input");
    var clearBtn = document.getElementById("clear-search-btn");
    if (!input || !clearBtn) return;

    function updateVisibleSectionCount(section) {
      var visibleCards = qsa(".pokemon-card", section).filter(function (card) {
        return card.style.display !== "none";
      });

      var countTag = qs(".poke-count", section);
      if (countTag) {
        countTag.textContent = "(x" + visibleCards.length + ")";
      }
    }

    function filterPokemon() {
      var query = input.value.trim().toLowerCase();
      var sections = qsa(".collection-section");

      sections.forEach(function (section) {
        var cards = qsa(".pokemon-card", section);
        var anyVisible = false;

        cards.forEach(function (card) {
          var text = card.textContent.toLowerCase();
          var match = query === "" || text.indexOf(query) !== -1;
          card.style.display = match ? "" : "none";
          if (match) anyVisible = true;
        });

        section.style.display = anyVisible ? "" : "none";
        updateVisibleSectionCount(section);
      });
    }

    input.addEventListener("input", filterPokemon);

    clearBtn.addEventListener("click", function () {
      input.value = "";
      filterPokemon();
      input.focus();
    });
  }

  /* ============================================================
     Preview capsule
     ============================================================ */
  function initPreviewCapsule() {
    var previewImg = document.getElementById("preview-pokemon-img");
    var previewName = document.getElementById("preview-pokemon-name");
    var previewMeta = document.getElementById("preview-pokemon-meta");
    var previewBall = document.getElementById("preview-pokeball-img");
    var previewSerial = document.getElementById("preview-serial-value");
    var previewContainment = document.getElementById("preview-containment-value");
    var previewHint = document.getElementById("preview-empty-hint");

    var cards = qsa(".pokemon-card");

    if (
      !previewImg ||
      !previewName ||
      !previewMeta ||
      !previewBall ||
      !previewSerial ||
      !previewContainment ||
      !previewHint ||
      !cards.length
    ) {
      return;
    }

    cards.forEach(function (card) {
      card.setAttribute("role", "button");
      card.setAttribute("aria-pressed", "false");
      if (!card.hasAttribute("tabindex")) {
        card.setAttribute("tabindex", "0");
      }
    });

    function extractContainmentLabel(card) {
      var ballImg = qs(".pokeball-img", card);
      if (!ballImg) return "---";

      var alt = (ballImg.getAttribute("alt") || "").trim();
      return alt || "Linked";
    }

    function extractPrimaryName(card) {
      var names = qsa(".pokemon-name", card);
      return names[0] ? textOf(names[0]) : "Unknown specimen";
    }

    function extractMeta(card) {
      var names = qsa(".pokemon-name", card);
      return names[1] ? textOf(names[1]) : "Unknown signature";
    }

    function extractSerial(card) {
      var serialNode = qs(".pokemon-serial", card);
      if (!serialNode) return "---";
      return textOf(serialNode).replace(/^Serial:\s*/i, "").trim() || "---";
    }

    function setSelectedCard(card) {
      cards.forEach(function (item) {
        item.classList.remove("is-preview-selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("is-preview-selected");
      card.setAttribute("aria-pressed", "true");
    }

    function applyPreview(card) {
      if (!card) return;

      var pokemonImg = qs(".pokemon-img", card);
      var pokeballImg = qs(".pokeball-img", card);
      var primaryName = extractPrimaryName(card);
      var meta = extractMeta(card);
      var serial = extractSerial(card);
      var containment = extractContainmentLabel(card);

      if (pokemonImg) {
        previewImg.src = pokemonImg.src;
        previewImg.alt = pokemonImg.alt || primaryName;
      } else {
        previewImg.removeAttribute("src");
        previewImg.alt = "Specimen preview";
      }

      if (pokeballImg) {
        previewBall.src = pokeballImg.src;
        previewBall.alt = pokeballImg.alt || "Containment ball";
      } else {
        previewBall.removeAttribute("src");
        previewBall.alt = "";
      }

      previewName.textContent = primaryName;
      previewMeta.textContent = meta;
      previewSerial.textContent = serial;
      previewContainment.textContent = containment;
      previewHint.textContent = "Toxic scan complete. Specimen isolated.";

      setSelectedCard(card);
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        applyPreview(card);
      });

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          applyPreview(card);
        }
      });
    });

    var firstVisibleCard = cards.find(function (card) {
      return card.style.display !== "none";
    });

    if (firstVisibleCard) {
      applyPreview(firstVisibleCard);
    }
  }

  // Make the Venom Capsule / Radiation Scanner draggable
  function makePreviewCapsuleDraggable() {
    var capsule = document.getElementById('pokemon-hover-preview');
    if (!capsule) return;
    let isDragging = false, offsetX = 0, offsetY = 0;

    capsule.addEventListener('mousedown', function(e) {
      // Only drag with left mouse button
      if (e.button !== 0) return;
      isDragging = true;
      capsule.style.cursor = 'grabbing';
      offsetX = e.clientX - capsule.getBoundingClientRect().left;
      offsetY = e.clientY - capsule.getBoundingClientRect().top;
      capsule.style.transition = 'none';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      // Keep within viewport
      x = Math.max(0, Math.min(window.innerWidth - capsule.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - capsule.offsetHeight, y));
      capsule.style.left = x + 'px';
      capsule.style.top = y + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        capsule.style.cursor = 'grab';
        capsule.style.transition = '';
        document.body.style.userSelect = '';
      }
    });
  }

  /* ============================================================
     Back to top
     ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById("back-to-top-btn");
    if (!btn) return;

    function updateVisibility() {
      if (window.scrollY > 240) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      }
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ============================================================
     Smooth anchor index behavior
     ============================================================ */
  function initSectionIndexSmoothScroll() {
    var links = qsa('.section-index-pixel a[href^="#"]');
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || href === "#") return;

        var target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();

        var header = qs(".collapsible-header", target);
        var content = qs(".collapsible-content", target);

        if (header && content && header.getAttribute("aria-expanded") === "false") {
          header.setAttribute("aria-expanded", "true");
          header.classList.remove("is-collapsed");
          content.hidden = false;
        }

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        window.setTimeout(function () {
          if (header) {
            header.focus({ preventScroll: true });
          }
        }, 450);
      });
    });
  }
})();