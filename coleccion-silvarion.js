const COLLAPSE_ANIMATION_MS = 460;
const COLLAPSE_EASING = 'cubic-bezier(0.2, 0.75, 0.2, 1)';

(function sortPokemonCardsAlphabetically() {
  const grids = Array.from(document.querySelectorAll('.collection-section .pokemon-grid'));

  const getCardName = (card) => {
    const nameElement = card.querySelector('.pokemon-name');
    return nameElement ? nameElement.textContent.trim() : '';
  };

  grids.forEach((grid) => {
    const cards = Array.from(grid.querySelectorAll(':scope > .pokemon-card'));
    if (cards.length < 2) return;

    cards
      .sort((leftCard, rightCard) => getCardName(leftCard).localeCompare(getCardName(rightCard), 'es', { sensitivity: 'base' }))
      .forEach((card) => {
        grid.appendChild(card);
      });
  });
})();

function animateOpen(panel) {
  panel.style.display = 'block';
  panel.style.overflow = 'hidden';
  panel.style.height = '0px';
  panel.style.opacity = '0.4';
  panel.style.transition = `height ${COLLAPSE_ANIMATION_MS}ms ${COLLAPSE_EASING}, opacity ${COLLAPSE_ANIMATION_MS}ms ease`;

  const targetHeight = panel.scrollHeight;
  panel.offsetHeight;

  requestAnimationFrame(() => {
    panel.style.height = `${targetHeight}px`;
    panel.style.opacity = '1';
  });

  window.setTimeout(() => {
    panel.style.height = '';
    panel.style.overflow = '';
    panel.style.transition = '';
  }, COLLAPSE_ANIMATION_MS);
}

function animateClose(panel) {
  panel.style.display = 'block';
  panel.style.overflow = 'hidden';
  panel.style.height = `${panel.scrollHeight}px`;
  panel.style.opacity = '1';
  panel.style.transition = `height ${COLLAPSE_ANIMATION_MS}ms ${COLLAPSE_EASING}, opacity ${COLLAPSE_ANIMATION_MS}ms ease`;

  panel.offsetHeight;

  requestAnimationFrame(() => {
    panel.style.height = '0px';
    panel.style.opacity = '0.35';
  });

  window.setTimeout(() => {
    panel.style.display = 'none';
    panel.style.height = '';
    panel.style.opacity = '';
    panel.style.overflow = '';
    panel.style.transition = '';
  }, COLLAPSE_ANIMATION_MS);
}

document.querySelectorAll('.collapsible-header').forEach((btn) => {
  const panel = btn.nextElementSibling;
  const arrow = btn.querySelector('.arrow');
  const startsHidden = window.getComputedStyle(panel).display === 'none';

  if (arrow) {
    arrow.textContent = startsHidden ? '▼' : '▲';
  }

  btn.setAttribute('aria-expanded', startsHidden ? 'false' : 'true');

  btn.addEventListener('click', function () {
    if (btn.dataset.animating === 'true') return;

    const isHidden = window.getComputedStyle(panel).display === 'none';
    btn.dataset.animating = 'true';

    if (isHidden) {
      animateOpen(panel);
      if (arrow) arrow.textContent = '▲';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      animateClose(panel);
      if (arrow) arrow.textContent = '▼';
      btn.setAttribute('aria-expanded', 'false');
    }

    window.setTimeout(() => {
      btn.dataset.animating = 'false';
    }, COLLAPSE_ANIMATION_MS + 20);
  });
});

(function setupPokemonTypeBadges() {
  const cards = Array.from(document.querySelectorAll('.collection-section .pokemon-card'));
  if (cards.length === 0) return;

  const typeDataSources = [
    'PokeDuel-Script.js',
    'BugNet.js',
    'FieryFisherRod.js',
    'GhostDetector.js',
    'IceHammer.js',
    'LeadPickaxe.js',
    'MagneticDetector.js',
  ];
  const typeIconBasePath = 'ColeccionSilvarion';
  const typeEntryPattern = /\{\s*name:\s*"([^"]+)"[\s\S]{0,320}?types:\s*\[([^\]]+)\]/g;
  const quotedValuePattern = /"([^"]+)"/g;
  const prefixPattern = /^(shiny|elite|cloned|red|shadow|crystal|golden|alpha|mega|armored|dark|light|ancient)\s+/i;
  const fallbackTypeEntries = {
    'shiny marshadow': ['Fighting', 'Ghost'],
    'cloned alomomola': ['Water'],
    'shiny feraligatr': ['Water'],
    'walking wake': ['Water', 'Dragon'],
    'ashs greninja': ['Water', 'Dark'],
    'cloned vaporeon': ['Water'],
    'cloned kingler': ['Water'],
    'shiny corsola': ['Water', 'Rock'],
    'champion poliwrath': ['Water', 'Fighting'],
    'shiny finizen': ['Water'],
    'shiny palafin': ['Water'],
    'shiny politoed': ['Water'],
    'shiny big magikarp': ['Water'],
    'shiny araquanid': ['Water', 'Bug'],
    'shiny ceruledge': ['Fire', 'Ghost'],
    'cloned ninetales': ['Fire'],
    'iron hands': ['Fighting', 'Electric'],
    'elder charizard': ['Fire', 'Flying'],
    'gouging fire': ['Fire', 'Dragon'],
    'cloned hitmonchan': ['Fighting'],
    'cloned hitmonlee': ['Fighting'],
    'cloned hitmontop': ['Fighting'],
    'cloned primeape': ['Fighting'],
    'cloned flareon': ['Fire'],
    'shiny grapploct': ['Fighting'],
    'shiny mr mime': ['Psychic', 'Fairy'],
    'shiny exeggutor': ['Grass', 'Psychic'],
    'shiny klefki': ['Steel', 'Fairy'],
    'shiny chimeco': ['Psychic'],
    'diancie': ['Rock', 'Fairy'],
    'shiny enamorus': ['Fairy', 'Flying'],
    'scream tail': ['Fairy', 'Psychic'],
    'cloned claydol': ['Ground', 'Psychic'],
    'shiny slurpuff': ['Fairy'],
    'carbink': ['Rock', 'Fairy'],
    'shiny clefable': ['Fairy'],
    'cloned chansey': ['Normal'],
    'shiny cetitan': ['Ice'],
    'shiny chien-pao': ['Dark', 'Ice'],
    'cloned dewong': ['Water', 'Ice'],
    'cloned hypno': ['Psychic'],
    'melmetal': ['Steel'],
    'shiny umbreon': ['Dark'],
    'roaring moon': ['Dragon', 'Dark'],
    'shiny mightyena': ['Dark'],
    'zarude': ['Dark', 'Grass'],
    'shiny shedinja': ['Bug', 'Ghost'],
    'shiny sunflora': ['Grass'],
    'shiny corviknight': ['Flying', 'Steel'],
    'shiny zeraora': ['Electric'],
    'zeraora': ['Electric'],
    'cloned togepi': ['Fairy'],
    'hisuian decidueye': ['Grass', 'Fighting'],
  };

  const normalizeName = (value) => value
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[’']/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const buildCandidateNames = (value) => {
    const candidates = new Set();
    let current = (value || '').trim();

    while (current) {
      candidates.add(normalizeName(current));

      const next = current.replace(prefixPattern, '').trim();
      if (!next || next === current) break;

      current = next;
    }

    return Array.from(candidates);
  };

  const parseTypesFromSource = (sourceText) => {
    const nextEntries = new Map();
    let match = typeEntryPattern.exec(sourceText);

    while (match) {
      const [, rawName, rawTypes] = match;
      const types = Array.from(rawTypes.matchAll(quotedValuePattern)).map((entry) => entry[1].trim());

      if (rawName && types.length > 0) {
        nextEntries.set(normalizeName(rawName), types);
      }

      match = typeEntryPattern.exec(sourceText);
    }

    typeEntryPattern.lastIndex = 0;
    return nextEntries;
  };

  const createTypeIcon = (type) => {
    const typeIcon = document.createElement('img');
    const normalizedType = type.toLowerCase();

    typeIcon.className = 'type-icon';
    typeIcon.setAttribute('src', `${typeIconBasePath}/type-${normalizedType}.png`);
    typeIcon.setAttribute('alt', type);

    return typeIcon;
  };

  const getExplicitCardTypes = (card) => {
    const rawTypes = card.dataset.types;
    if (!rawTypes) return [];

    return rawTypes
      .split(',')
      .map((type) => type.trim())
      .filter(Boolean);
  };

  const ensureCardTopRow = (card) => {
    let topRow = card.querySelector(':scope > .pokemon-card-top');
    if (topRow) return topRow;

    topRow = document.createElement('div');
    topRow.className = 'pokemon-card-top';

    const ball = card.querySelector(':scope > .pokeball-img');
    const image = card.querySelector(':scope > .pokemon-img');

    if (ball) {
      topRow.appendChild(ball);
    }

    card.insertBefore(topRow, image || card.firstChild);
    return topRow;
  };

  const applyTypesToCards = (typeMap) => {
    cards.forEach((card) => {
      const nameElement = card.querySelector('.pokemon-name');
      if (!nameElement) return;

      const topRow = ensureCardTopRow(card);
      let typeRow = topRow.querySelector('.pokemon-types');
      if (!typeRow) {
        typeRow = document.createElement('div');
        typeRow.className = 'pokemon-types';
        topRow.insertBefore(typeRow, topRow.firstChild);
      }

      if (typeRow.childElementCount > 0) return;

      const explicitTypes = getExplicitCardTypes(card);
      if (explicitTypes.length > 0) {
        explicitTypes.forEach((type) => {
          typeRow.appendChild(createTypeIcon(type));
        });
        return;
      }

      const resolvedTypes = buildCandidateNames(nameElement.textContent).find((candidate) => typeMap.has(candidate));
      if (!resolvedTypes) return;

      typeMap.get(resolvedTypes).forEach((type) => {
        typeRow.appendChild(createTypeIcon(type));
      });
    });
  };

  Promise.all(
    typeDataSources.map((path) => fetch(path).then((response) => (response.ok ? response.text() : '')).catch(() => ''))
  )
    .then((sources) => {
      const typeMap = new Map();

      sources.forEach((sourceText) => {
        parseTypesFromSource(sourceText).forEach((types, name) => {
          if (!typeMap.has(name)) {
            typeMap.set(name, types);
          }
        });
      });

      Object.entries(fallbackTypeEntries).forEach(([name, types]) => {
        if (!typeMap.has(name)) {
          typeMap.set(name, types);
        }
      });

      applyTypesToCards(typeMap);
    })
    .catch(() => {
      // Leave cards unchanged if local type sources are unavailable.
    });
})();

(function setupPokemonHoverPreview() {
  const preview = document.getElementById('pokemon-hover-preview');
  if (!preview) return;

  const previewImg = document.getElementById('preview-pokemon-img');
  const previewName = document.getElementById('preview-pokemon-name');
  const previewMeta = document.getElementById('preview-pokemon-meta');
  const previewBall = document.getElementById('preview-pokeball-img');
  const previewTypes = document.getElementById('preview-pokemon-types');
  const previewBallContainer = previewBall ? previewBall.closest('.preview-pokeball-container') : null;
  const cards = Array.from(document.querySelectorAll('.collection-section .pokemon-card'));
  const hintStorageKey = 'silvarion-monitor-click-note-seen';
  const createGlitchTextController = (element) => {
    if (!element) return null;

    let chars = [];
    let resizeRaf = 0;

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const fitTextToWidth = () => {
      const computed = window.getComputedStyle(element);
      const minFontSize = 10;
      const baseFontSize = Number.parseFloat(element.dataset.baseFontSize || computed.fontSize) || 24;

      if (!element.dataset.baseFontSize) {
        element.dataset.baseFontSize = String(baseFontSize);
      }

      element.style.fontSize = `${baseFontSize}px`;
      element.style.transform = 'none';
      element.style.transformOrigin = 'center center';

      if (element.clientWidth <= 0) return;

      let nextSize = baseFontSize;
      while (element.scrollWidth > element.clientWidth && nextSize > minFontSize) {
        nextSize -= 0.5;
        element.style.fontSize = `${nextSize}px`;
      }

      if (element.scrollWidth > element.clientWidth) {
        const ratio = element.clientWidth / element.scrollWidth;
        const safeRatio = Math.max(0.78, Math.min(1, ratio));
        element.style.transform = `scale(${safeRatio})`;
      }
    };

    const setText = (value) => {
      const rawText = typeof value === 'string' ? value : '';
      element.setAttribute('aria-label', rawText);
      element.classList.add('glitch-text');
      element.textContent = '';

      const fragment = document.createDocumentFragment();
      rawText.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'glitch-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        fragment.appendChild(span);
      });

      element.appendChild(fragment);

      chars = Array.from(element.querySelectorAll('.glitch-char')).filter((node) => node.textContent.trim() !== '');

      window.requestAnimationFrame(fitTextToWidth);
    };

    const triggerGlitch = () => {
      if (chars.length === 0) return;

      element.classList.add('old-school-flash');
      window.setTimeout(() => {
        element.classList.remove('old-school-flash');
      }, randomInt(170, 310));

      const totalChars = randomInt(1, Math.min(3, chars.length));
      for (let index = 0; index < totalChars; index += 1) {
        const target = chars[randomInt(0, chars.length - 1)];
        if (!target) continue;

        target.classList.add('is-glitching');
        window.setTimeout(() => {
          target.classList.remove('is-glitching');
        }, randomInt(130, 280));
      }
    };

    const scheduleGlitch = () => {
      window.setTimeout(() => {
        triggerGlitch();
        scheduleGlitch();
      }, randomInt(1300, 3000));
    };

    const onResize = () => {
      if (resizeRaf) {
        window.cancelAnimationFrame(resizeRaf);
      }
      resizeRaf = window.requestAnimationFrame(fitTextToWidth);
    };

    window.addEventListener('resize', onResize);

    scheduleGlitch();

    return { setText, triggerGlitch };
  };

  if (!previewImg || !previewName || !previewMeta || cards.length === 0) return;

  // Ball shake + spark + pause loop
  if (previewBall && previewBallContainer) {
    let ballLoopTimeout = null;
    let shakeCount = 0;
    let running = false;
    function doShake() {
      previewBall.classList.remove('is-capture-shaking');
      void previewBall.offsetWidth;
      previewBall.classList.add('is-capture-shaking');
    }
    function startBallLoop() {
      if (running) return;
      running = true;
      shakeCount = 0;
      previewBallContainer.classList.remove('is-caught-spark');
      doShake();
    }
    previewBall.addEventListener('animationend', (event) => {
      if (event.animationName !== 'monitorBallShakeLoop') return;
      previewBall.classList.remove('is-capture-shaking');
      shakeCount++;
      if (shakeCount < 3) {
        // Next shake after a short delay (reduce by 30%)
        ballLoopTimeout = setTimeout(() => {
          doShake();
        }, 56); // 80ms * 0.7
      } else {
        // Show spark
        // Reduce delay before spark by 30% (was 80ms, now 56ms)
        ballLoopTimeout = setTimeout(() => {
          previewBallContainer.classList.add('is-caught-spark');
          // Spark duration remains the same (animation duration)
          ballLoopTimeout = setTimeout(() => {
            previewBallContainer.classList.remove('is-caught-spark');
            // Pause for 1s, then restart (30% less)
            ballLoopTimeout = setTimeout(() => {
              shakeCount = 0;
              doShake();
            }, 700); // 1000ms * 0.7
          }, 301); // 430ms * 0.7
        }, 56);
      }
    });
    // Start the loop if a ball is shown
    const observer = new MutationObserver(() => {
      if (previewBall.getAttribute('src')) {
        running = false;
        shakeCount = 0;
        previewBall.classList.remove('is-capture-shaking');
        previewBallContainer.classList.remove('is-caught-spark');
        if (ballLoopTimeout) clearTimeout(ballLoopTimeout);
        startBallLoop();
      } else {
        running = false;
        shakeCount = 0;
        previewBall.classList.remove('is-capture-shaking');
        previewBallContainer.classList.remove('is-caught-spark');
        if (ballLoopTimeout) clearTimeout(ballLoopTimeout);
      }
    });
    observer.observe(previewBall, { attributes: true, attributeFilter: ['src'] });
  }

  const previewNameGlitch = createGlitchTextController(previewName);

  const hint = document.createElement('p');
  hint.className = 'preview-behavior-note';
  hint.textContent = 'Tip: click a Pokemon card to update this monitor.';

  if (!window.localStorage.getItem(hintStorageKey)) {
    preview.appendChild(hint);
  }

  previewImg.removeAttribute('src');
  if (previewNameGlitch) {
    previewNameGlitch.setText('Selecciona un Pokémon');
  } else {
    previewName.textContent = 'Selecciona un Pokémon';
  }
  previewMeta.textContent = 'para mostrar sus detalles';
  if (previewBall) previewBall.removeAttribute('src');
  if (previewTypes) previewTypes.replaceChildren();

  let selectedCard = null;

  const updatePreview = (card) => {
    const sprite = card.querySelector('.pokemon-img');
    const names = card.querySelectorAll('.pokemon-name');
    if (!sprite || names.length === 0) return;

    const name = names[0] ? names[0].textContent.trim() : 'Pokemon';
    const meta = names[1] ? names[1].textContent.trim() : 'Sex / Ability';
    const src = sprite.getAttribute('src') || '';
    const alt = sprite.getAttribute('alt') || name;
    const section = card.closest('.collection-section');
    const ballEl = section ? section.querySelector('.ball-icon') : null;
    const ballSrc = ballEl ? (ballEl.getAttribute('src') || '') : '';
    const ballAlt = ballEl ? (ballEl.getAttribute('alt') || '') : '';
    const cardTypes = Array.from(card.querySelectorAll('.pokemon-types .type-icon')).map((icon) => ({
      src: icon.getAttribute('src') || '',
      alt: icon.getAttribute('alt') || '',
    }));

    preview.classList.add('is-updating');

    window.setTimeout(() => {
      previewImg.setAttribute('src', src);
      previewImg.setAttribute('alt', alt);
      if (previewNameGlitch) {
        previewNameGlitch.setText(name);
        previewNameGlitch.triggerGlitch();
      } else {
        previewName.textContent = name;
      }
      previewMeta.textContent = meta;
      if (previewBall) {
        previewBall.classList.remove('is-capture-shaking');
        if (previewBallContainer) previewBallContainer.classList.remove('is-caught-spark');
        if (ballSrc) {
          previewBall.setAttribute('src', ballSrc);
          previewBall.setAttribute('alt', ballAlt);
          // Ball loop will auto-start via MutationObserver
        } else {
          previewBall.removeAttribute('src');
        }
      }
      if (previewTypes) {
        previewTypes.replaceChildren();
        cardTypes.forEach((type) => {
          if (!type.src) return;

          const typeIcon = document.createElement('img');
          typeIcon.className = 'preview-type-icon';
          typeIcon.setAttribute('src', type.src);
          typeIcon.setAttribute('alt', type.alt);
          previewTypes.appendChild(typeIcon);
        });
      }
      preview.classList.remove('is-updating');
    }, 80);

    if (selectedCard) {
      selectedCard.classList.remove('is-preview-selected');
    }

    selectedCard = card;
    selectedCard.classList.add('is-preview-selected');

    if (hint.isConnected) {
      hint.remove();
      window.localStorage.setItem(hintStorageKey, '1');
    }
  };

  cards.forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener('click', () => updatePreview(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        updatePreview(card);
      }
    });
  });
})();

(function setupPreviewDragAndDrop() {
  const preview = document.getElementById('pokemon-hover-preview');
  if (!preview) return;

  const handle = preview.querySelector('.preview-shell-label') || preview;
  const storageKey = 'silvarion-monitor-link-position';
  const edgePadding = 8;

  let dragging = false;
  let pointerId = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  const getClampedPosition = (left, top) => {
    const maxLeft = window.innerWidth - preview.offsetWidth - edgePadding;
    const maxTop = window.innerHeight - preview.offsetHeight - edgePadding;

    return {
      left: Math.min(Math.max(left, edgePadding), Math.max(edgePadding, maxLeft)),
      top: Math.min(Math.max(top, edgePadding), Math.max(edgePadding, maxTop)),
    };
  };

  const applyPosition = (left, top, persist) => {
    const clamped = getClampedPosition(left, top);
    preview.style.left = `${clamped.left}px`;
    preview.style.top = `${clamped.top}px`;
    preview.style.right = 'auto';
    preview.style.bottom = 'auto';

    if (persist) {
      window.localStorage.setItem(storageKey, JSON.stringify(clamped));
    }
  };

  const savedPosition = window.localStorage.getItem(storageKey);
  if (savedPosition) {
    try {
      const parsed = JSON.parse(savedPosition);
      if (typeof parsed.left === 'number' && typeof parsed.top === 'number') {
        applyPosition(parsed.left, parsed.top, false);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }

  handle.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;

    const rect = preview.getBoundingClientRect();
    dragging = true;
    pointerId = event.pointerId;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    preview.classList.add('dragging');
    handle.setPointerCapture(pointerId);
    event.preventDefault();
  });

  handle.addEventListener('pointermove', (event) => {
    if (!dragging || event.pointerId !== pointerId) return;

    const nextLeft = event.clientX - dragOffsetX;
    const nextTop = event.clientY - dragOffsetY;
    applyPosition(nextLeft, nextTop, false);
  });

  const finishDrag = (event) => {
    if (!dragging || event.pointerId !== pointerId) return;

    dragging = false;
    preview.classList.remove('dragging');

    const rect = preview.getBoundingClientRect();
    applyPosition(rect.left, rect.top, true);

    if (handle.hasPointerCapture(pointerId)) {
      handle.releasePointerCapture(pointerId);
    }

    pointerId = null;
  };

  handle.addEventListener('pointerup', finishDrag);
  handle.addEventListener('pointercancel', finishDrag);

  window.addEventListener('resize', () => {
    const rect = preview.getBoundingClientRect();
    applyPosition(rect.left, rect.top, true);
  });
})();
