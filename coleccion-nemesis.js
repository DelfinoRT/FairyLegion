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
    var initialText = textOf(totalBtn);
    var labelMatch = initialText.match(/^(.*?)(\d+)\s*$/);
    var label = labelMatch ? labelMatch[1] : "Pokemon en la coleccion: ";
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

    var cards = qsa(".pokemon-card");

    if (
      !previewImg ||
      !previewName ||
      !previewMeta ||
      !previewBall ||
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

    function extractPrimaryName(card) {
      var names = qsa(".pokemon-name", card);
      return names[0] ? textOf(names[0]) : "Unknown specimen";
    }

    function extractMeta(card) {
      var names = qsa(".pokemon-name", card);
      return names[1] ? textOf(names[1]) : "Unknown signature";
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

    var handle = capsule.querySelector('.preview-shell-label') || capsule;
    var storageKey = 'nemesis-capsule-position';
    var edgePadding = 8;
    var dragging = false;
    var pointerId = null;
    var dragOffsetX = 0;
    var dragOffsetY = 0;

    function getClampedPosition(left, top) {
      var maxLeft = window.innerWidth - capsule.offsetWidth - edgePadding;
      var maxTop = window.innerHeight - capsule.offsetHeight - edgePadding;
      return {
        left: Math.min(Math.max(left, edgePadding), Math.max(edgePadding, maxLeft)),
        top: Math.min(Math.max(top, edgePadding), Math.max(edgePadding, maxTop))
      };
    }

    function applyPosition(left, top, persist) {
      var clamped = getClampedPosition(left, top);
      capsule.style.left = clamped.left + 'px';
      capsule.style.top = clamped.top + 'px';
      capsule.style.right = 'auto';
      capsule.style.bottom = 'auto';

      if (persist) {
        window.localStorage.setItem(storageKey, JSON.stringify(clamped));
      }
    }

    var savedPosition = window.localStorage.getItem(storageKey);
    if (savedPosition) {
      try {
        var parsed = JSON.parse(savedPosition);
        if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
          applyPosition(parsed.left, parsed.top, false);
        }
      } catch (e) {
        window.localStorage.removeItem(storageKey);
      }
    }

    handle.addEventListener('pointerdown', function (event) {
      if (event.button !== 0) return;

      var rect = capsule.getBoundingClientRect();
      dragging = true;
      pointerId = event.pointerId;
      dragOffsetX = event.clientX - rect.left;
      dragOffsetY = event.clientY - rect.top;

      capsule.classList.add('dragging');
      if (handle.setPointerCapture) {
        handle.setPointerCapture(pointerId);
      }
      event.preventDefault();
    });

    handle.addEventListener('pointermove', function (event) {
      if (!dragging || event.pointerId !== pointerId) return;

      var nextLeft = event.clientX - dragOffsetX;
      var nextTop = event.clientY - dragOffsetY;
      applyPosition(nextLeft, nextTop, false);
    });

    function finishDrag(event) {
      if (!dragging || event.pointerId !== pointerId) return;

      dragging = false;
      capsule.classList.remove('dragging');

      var rect = capsule.getBoundingClientRect();
      applyPosition(rect.left, rect.top, true);

      if (handle.hasPointerCapture && handle.hasPointerCapture(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }

      pointerId = null;
    }

    handle.addEventListener('pointerup', finishDrag);
    handle.addEventListener('pointercancel', finishDrag);

    window.addEventListener('resize', function () {
      var rect = capsule.getBoundingClientRect();
      applyPosition(rect.left, rect.top, true);
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