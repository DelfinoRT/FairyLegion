const COLLAPSE_ANIMATION_MS = 460;
const COLLAPSE_EASING = 'cubic-bezier(0.2, 0.75, 0.2, 1)';

(function setupBallRain() {
  const rain = document.querySelector('.ball-rain');
  if (!rain) return;

  const icons = document.querySelectorAll('.section-index-pixel .ball-icon');
  icons.forEach((icon, index) => {
    const sprite = document.createElement('img');
    sprite.src = icon.src;
    sprite.alt = '';
    sprite.style.setProperty('--rain-x', `${(index + 0.5) * 100 / icons.length}%`);
    sprite.style.setProperty('--rain-size', `${24 + (index % 4) * 4}px`);
    sprite.style.setProperty('--rain-duration', `${12 + (index % 5) * 2}s`);
    sprite.style.setProperty('--rain-delay', `${-(index * 7 % 17)}s`);
    rain.appendChild(sprite);
  });
})();

(function setupPadventuresCharacterCard() {
  const card = document.getElementById('silvarion-character-card');
  const sprite = document.getElementById('silvarion-character-sprite');
  const text = document.getElementById('silvarion-character-text');
  const world = document.getElementById('silvarion-character-world');
  const embed = document.getElementById('silvarion-character-embed');
  const teamCard = document.getElementById('silvarion-team-card');
  const teamGrid = document.getElementById('silvarion-team-grid');
  if (!card || !sprite || !text || !world) return;

  const endpoint = 'https://api.padventures.org/w/RZF8C9QcAiZZQJSRQckaXF';
  const jsonEndpoint = `${endpoint}.json`;
  const teamEndpoint = 'https://api.padventures.org/w/K2K4WASjE4LcO9Yjawl07Z.json';
  const teamProxyEndpoint = 'https://r.jina.ai/http://api.padventures.org/w/K2K4WASjE4LcO9Yjawl07Z.json';
  const defaultColor = '#8000ff';
  let pollTimerId = 0;
  let lastEtag = '';
  let pollUrl = '';
  let polling = false;
  let pollDelay = 15000;
  let teamLoadAttempt = 0;
  let teamRetryTimerId = 0;

  const isValidHexColor = (value) => /^#[0-9a-fA-F]{6}$/.test(value || '');

  const showEmbedFallback = () => {
    if (!embed) return;

    card.classList.remove('is-error');
    card.classList.add('is-embed-mode');
    embed.hidden = false;

    const main = card.querySelector('.silvarion-character-main');
    if (main) {
      main.hidden = true;
      main.style.display = 'none';
    }

    text.textContent = '';
  };

  const buildLine = (state) => {
    const name = typeof state.name === 'string' ? state.name.trim() : '';
    const level = Number.isFinite(state.level) ? state.level : Number.parseInt(state.level, 10);
    if (name && Number.isFinite(level)) return `${name} [${level}]`;
    if (name) return name;
    if (Number.isFinite(level)) return `Nivel [${level}]`;
    return '';
  };

  const applyState = (state) => {
    if (!state || state.active === false) {
      card.hidden = true;
      return;
    }

    card.hidden = false;
    card.classList.remove('is-error');
    card.classList.remove('is-embed-mode');

    if (embed) {
      embed.hidden = true;
    }

    const main = card.querySelector('.silvarion-character-main');
    if (main) {
      main.hidden = false;
      main.style.display = '';
    }

    if (state.image) {
      if (sprite.getAttribute('src') !== state.image) {
        sprite.setAttribute('src', state.image);
      }
      sprite.hidden = false;
    }

    const line = buildLine(state);
    text.textContent = line || 'Personaje sin datos';

    const color = isValidHexColor(state.font_color) ? state.font_color : defaultColor;
    text.style.color = color;

    if (state.world_icon) {
      if (world.getAttribute('src') !== state.world_icon) {
        world.setAttribute('src', state.world_icon);
      }
      world.hidden = false;
    } else {
      world.hidden = true;
      world.removeAttribute('src');
    }

    if (typeof state.poll === 'string' && state.poll.trim()) {
      pollUrl = new URL(state.poll, endpoint).toString();
      schedulePoll();
    }
  };

  function schedulePoll() {
    clearTimeout(pollTimerId);
    if (!pollUrl || document.hidden || polling) return;
    pollTimerId = window.setTimeout(async () => {
      polling = true;
      try {
        const nextState = await fetchStateFromJson(pollUrl);
        if (nextState) applyState(nextState);
        pollDelay = 15000;
      } catch {
        pollDelay = Math.min(pollDelay * 2, 120000);
      } finally {
        polling = false;
        schedulePoll();
      }
    }, pollDelay);
  }
  document.addEventListener('visibilitychange', schedulePoll);

  const fetchStateFromJson = async (url) => {
    const headers = {};
    if (lastEtag) {
      headers['If-None-Match'] = lastEtag;
    }

    const response = await fetch(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (response.status === 304) return null;
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    const etag = response.headers.get('ETag');
    if (etag) {
      lastEtag = etag;
    }

    return response.json();
  };

  const parseStateFromHtml = (html) => {
    const match = html.match(/var\s+cfg\s*=\s*(\{[\s\S]*?\});/);
    if (!match) return null;

    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  };

  const loadInitialState = async () => {
    try {
      const jsonState = await fetchStateFromJson(jsonEndpoint);
      if (jsonState) {
        applyState(jsonState);
        return;
      }
    } catch {
      // Fall through to HTML parser fallback.
    }

    try {
      const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      const html = await response.text();
      const htmlState = parseStateFromHtml(html);

      if (htmlState) {
        applyState(htmlState);
        return;
      }
    } catch {
      // Show graceful fallback message.
    }

    showEmbedFallback();
    if (embed && !embed.hidden) {
      return;
    }

    card.classList.add('is-error');
    text.textContent = 'No se pudo cargar el personaje';
    sprite.hidden = true;
    sprite.removeAttribute('src');
    world.hidden = true;
    world.removeAttribute('src');
  };

  const normalizeTeamName = (value) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '');

  const parseTeamPayload = (text) => {
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/var\s+cfg\s*=\s*(\{[\s\S]*?\});/);
      if (!match) return null;

      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
  };

  const fetchText = async (url) => {
    const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

    return response.text();
  };

  const createTeamMemberCard = (member, index) => {
    const slot = document.createElement('article');
    slot.className = 'silvarion-team-member';

    const spriteImage = document.createElement('img');
    spriteImage.className = 'silvarion-team-member-sprite';
    spriteImage.src = member.image || '';
    spriteImage.alt = normalizeTeamName(member.name) || `Pokemon del equipo ${index + 1}`;
    spriteImage.loading = 'lazy';
    spriteImage.decoding = 'async';

    const caption = document.createElement('div');
    caption.className = 'silvarion-team-member-caption';

    const name = document.createElement('div');
    name.className = 'silvarion-team-member-name';
    name.textContent = normalizeTeamName(member.name) || `Pokemon ${index + 1}`;

    const meta = document.createElement('div');
    meta.className = 'silvarion-team-member-meta';

    if (member.ball) {
      const ball = document.createElement('img');
      ball.className = 'silvarion-team-member-ball';
      ball.src = member.ball;
      ball.alt = '';
      ball.loading = 'lazy';
      ball.decoding = 'async';
      meta.appendChild(ball);
    }

    const level = document.createElement('span');
    level.className = 'silvarion-team-member-level';
    const numericLevel = Number.parseInt(member.level, 10);
    level.textContent = Number.isFinite(numericLevel) ? `Lv. ${numericLevel}` : 'Lv. -';

    meta.appendChild(level);
    caption.appendChild(name);
    caption.appendChild(meta);
    slot.appendChild(spriteImage);
    slot.appendChild(caption);

    return slot;
  };

  const renderTeamState = (state) => {
    if (!teamCard || !teamGrid) return;

    if (!state || state.active === false) {
      teamCard.hidden = true;
      return;
    }

    teamCard.hidden = false;
    teamGrid.textContent = '';

    const team = Array.isArray(state.team) ? state.team : [];
    team.forEach((member, index) => {
      teamGrid.appendChild(createTeamMemberCard(member || {}, index));
    });
  };

  const loadTeamState = async () => {
    if (!teamCard || !teamGrid) return;

    teamCard.hidden = false;
    teamGrid.textContent = '';

    if (teamRetryTimerId) {
      window.clearTimeout(teamRetryTimerId);
      teamRetryTimerId = 0;
    }

    try {
      let teamState = null;

      try {
        teamState = parseTeamPayload(await fetchText(teamEndpoint));
      } catch {
        teamState = null;
      }

      if (!teamState) {
        const proxyText = await fetchText(teamProxyEndpoint);
        const jsonStart = proxyText.indexOf('{');
        const jsonEnd = proxyText.lastIndexOf('}');
        const rawPayload = jsonStart >= 0 && jsonEnd > jsonStart ? proxyText.slice(jsonStart, jsonEnd + 1) : proxyText;
        teamState = parseTeamPayload(rawPayload);
      }

      if (!teamState) throw new Error('Invalid team payload');

      renderTeamState(teamState);
      teamLoadAttempt = 0;
    } catch {
      teamLoadAttempt += 1;

      if (teamLoadAttempt < 3) {
        teamRetryTimerId = window.setTimeout(() => {
          loadTeamState().catch(() => {});
        }, 2500);
        return;
      }
    }
  };

  loadInitialState();
  loadTeamState();
})();

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

  const typeIconBasePath = 'ColeccionSilvarion';
  const prefixPattern = /^(shiny|elite|cloned|red|shadow|crystal|golden|alpha|mega|armored|dark|light|ancient)\s+/i;
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

  const createTypeIcon = (type) => {
    const typeIcon = document.createElement('img');
    const normalizedType = type.toLowerCase();

    typeIcon.className = 'type-icon';
    typeIcon.setAttribute('src', `${typeIconBasePath}/type-${normalizedType}.png`);
    typeIcon.setAttribute('alt', type);
    typeIcon.loading = 'lazy';
    typeIcon.decoding = 'async';

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

  fetch('pokemon-types.json')
    .then(response => {
      if (!response.ok) throw new Error('Could not load Pokémon types');
      return response.json();
    })
    .then(entries => applyTypesToCards(new Map(Object.entries(entries))))
    .catch(() => applyTypesToCards(new Map()));

})();

(function setupPokemonHoverPreview() {
  const preview = document.getElementById('pokemon-hover-preview');
  if (!preview) return;

  const previewImg = document.getElementById('preview-pokemon-img');
  const previewName = document.getElementById('preview-pokemon-name');
  const previewMeta = document.getElementById('preview-pokemon-meta');
  const previewDescription = document.getElementById('preview-pokemon-description');
  const previewBall = document.getElementById('preview-pokeball-img');
  const previewTypes = document.getElementById('preview-pokemon-types');
  const closeButton = preview.querySelector('.preview-close-btn');
  const backdrop = document.querySelector('.preview-backdrop');
  const mobilePreview = window.matchMedia('(max-width: 1450px)');
  const previewBallContainer = previewBall ? previewBall.closest('.preview-pokeball-container') : null;
  const cards = Array.from(document.querySelectorAll('.collection-section .pokemon-card'));
  const hintStorageKey = 'silvarion-monitor-click-note-seen';
  const descriptions = new Map();
  let selectionVersion = 0;

  const getDescription = (name) => window.silvarionDexLookup(name).then((id) => {
    if (!id) return null;
    if (!descriptions.has(id)) {
      const request = fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error(`PokeAPI returned ${response.status}`);
          return response.json();
        })
        .then((species) => {
          const entry = species.flavor_text_entries.find((item) => item.language.name === 'en');
          return entry ? entry.flavor_text.replace(/\s+/g, ' ').trim() : null;
        })
        .catch((error) => {
          descriptions.delete(id);
          throw error;
        });
      descriptions.set(id, request);
    }
    return descriptions.get(id);
  });
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

  if (previewNameGlitch) {
    previewNameGlitch.setText('Selecciona un Pokémon');
  } else {
    previewName.textContent = 'Selecciona un Pokémon';
  }
  previewMeta.textContent = 'para mostrar sus detalles';
  if (previewBall) previewBall.removeAttribute('src');
  if (previewTypes) previewTypes.replaceChildren();

  let selectedCard = null;

  const closePreview = () => {
    if (!preview.classList.contains('is-open')) return;
    preview.classList.remove('is-open');
    document.body.classList.remove('preview-open');
    preview.removeAttribute('role');
    preview.removeAttribute('aria-modal');
    preview.removeAttribute('aria-label');
    if (selectedCard && mobilePreview.matches) selectedCard.focus({ preventScroll: true });
  };

  if (closeButton) closeButton.addEventListener('click', closePreview);
  if (backdrop) backdrop.addEventListener('click', closePreview);
  document.addEventListener('keydown', (event) => {
    if (!preview.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      closePreview();
    } else if (event.key === 'Tab' && closeButton) {
      event.preventDefault();
      closeButton.focus();
    }
  });
  mobilePreview.addEventListener('change', closePreview);

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

    const currentSelection = ++selectionVersion;
    if (previewDescription) {
      previewDescription.textContent = 'Loading Pokédex entry...';
      getDescription(name).then((description) => {
        if (currentSelection !== selectionVersion) return;
        previewDescription.textContent = description || 'No Pokédex entry available.';
      }).catch((error) => {
        console.error('Could not load Pokédex entry:', error);
        if (currentSelection === selectionVersion) {
          previewDescription.textContent = 'Could not load Pokédex entry. Please try again.';
        }
      });
    }

    preview.classList.add('is-updating');

    window.setTimeout(() => {
      if (currentSelection !== selectionVersion) return;
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

    if (mobilePreview.matches && closeButton) {
      preview.setAttribute('role', 'dialog');
      preview.setAttribute('aria-modal', 'true');
      preview.setAttribute('aria-label', 'Monitor Link');
      preview.classList.add('is-open');
      document.body.classList.add('preview-open');
      closeButton.focus({ preventScroll: true });
    }

    if (hint.isConnected) {
      hint.remove();
      window.localStorage.setItem(hintStorageKey, '1');
    }
  };

  cards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
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
    if (event.button !== 0 || window.matchMedia('(max-width: 1450px)').matches) return;

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
    if (window.matchMedia('(max-width: 1450px)').matches) return;
    const rect = preview.getBoundingClientRect();
    applyPosition(rect.left, rect.top, true);
  });
})();
