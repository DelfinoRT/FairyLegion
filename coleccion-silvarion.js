const COLLAPSE_ANIMATION_MS = 460;
const COLLAPSE_EASING = 'cubic-bezier(0.2, 0.75, 0.2, 1)';

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

(function setupPokemonHoverPreview() {
  const preview = document.getElementById('pokemon-hover-preview');
  if (!preview) return;

  const previewImg = document.getElementById('preview-pokemon-img');
  const previewName = document.getElementById('preview-pokemon-name');
  const previewMeta = document.getElementById('preview-pokemon-meta');
  const cards = Array.from(document.querySelectorAll('.collection-section .pokemon-card'));
  const hintStorageKey = 'silvarion-monitor-click-note-seen';

  if (!previewImg || !previewName || !previewMeta || cards.length === 0) return;

  const hint = document.createElement('p');
  hint.className = 'preview-behavior-note';
  hint.textContent = 'Tip: click a Pokemon card to update this monitor.';

  if (!window.localStorage.getItem(hintStorageKey)) {
    preview.appendChild(hint);
  }

  previewImg.removeAttribute('src');
  previewName.textContent = 'Selecciona un Pokemon';
  previewMeta.textContent = 'para mostrar sus detalles';

  let selectedCard = null;

  const updatePreview = (card) => {
    const sprite = card.querySelector('.pokemon-img');
    const names = card.querySelectorAll('.pokemon-name');
    if (!sprite || names.length === 0) return;

    const name = names[0] ? names[0].textContent.trim() : 'Pokemon';
    const meta = names[1] ? names[1].textContent.trim() : 'Sex / Ability';
    const src = sprite.getAttribute('src') || '';
    const alt = sprite.getAttribute('alt') || name;

    preview.classList.add('is-updating');

    window.setTimeout(() => {
      previewImg.setAttribute('src', src);
      previewImg.setAttribute('alt', alt);
      previewName.textContent = name;
      previewMeta.textContent = meta;
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
