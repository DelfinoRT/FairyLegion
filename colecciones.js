'use strict';

(() => {
  const API = 'https://api.fairylegion.com';
  const $ = id => document.getElementById(id);
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  const extraBalls = ['Beast Ball', 'Great Ball', 'Master Ball'];
  const status = text => { $('status').textContent = text; };
  const option = (parent, value) => parent.append(new Option(value, value));
  types.forEach(type => { option($('type-filter'), type); document.querySelectorAll('.type-input').forEach(select => option(select, type)); });
  let catalog = [];
  let ballSprites = [];
  let current = null;
  let saved = null;
  let entryOrigins = new WeakMap();
  let editingUser = null;
  let editingIndex = null;
  let typeRequest = 0;
  let dirty = false;
  let pendingEntry = false;
  let typeLoading = false;
  window.addEventListener('beforeunload', event => {
    if (dirty || pendingEntry) event.preventDefault();
  });
  async function api(route, method = 'GET', data) {
    const response = await fetch(API + route, {
      method, credentials: 'include',
      ...(data ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) } : {})
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `Error ${response.status}`);
    return result;
  }
  function run(action) {
    return Promise.resolve().then(action).catch(error => status(error.message || 'No se pudo conectar al servicio de colecciones.'));
  }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(text, action) {
    const node = element('button', text, 'secondary');
    node.type = 'button';
    node.addEventListener('click', () => run(action));
    return node;
  }
  function linkFor(slug) { return `colecciones.html?coleccion=${encodeURIComponent(slug)}`; }
  function applyTheme(target, background, accent) {
    target.style.background = `linear-gradient(#0006, #0006), radial-gradient(circle at top, ${accent}55, transparent 55%), linear-gradient(145deg, ${background}, #191022 85%)`;
    target.style.setProperty('--collection-accent', accent);
  }
  function renderThemePreview() {
    const form = $('settings');
    applyTheme($('theme-preview'), form.elements.background.value, form.elements.accent.value);
    $('preview-name').textContent = form.elements.name.value || 'Tu colección';
  }
  function ballKey(name) {
    const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return key === 'pokeballball' ? 'pokeball' : key;
  }
  function markSaved() {
    saved = structuredClone(current);
    entryOrigins = new WeakMap();
    current.entries.forEach((entry, index) => entryOrigins.set(entry, saved.entries[index]));
  }
  function renderChanges() {
    if (!saved) return;
    const form = $('settings');
    const changes = [];
    for (const [field, label] of [['name', 'Nombre de la colección'], ['background', 'Color de fondo'], ['accent', 'Color de acento']]) {
      if (form.elements[field].value !== saved[field]) changes.push(`${label}: ${saved[field]} → ${form.elements[field].value}`);
    }
    const remaining = new Set(saved.entries);
    for (const entry of current.entries) {
      const original = entryOrigins.get(entry);
      if (!original) changes.push(`Pokémon agregado: ${entry.name}`);
      else {
        remaining.delete(original);
        const fields = [['name', 'nombre'], ['sprite', 'sprite'], ['ball', 'ball'], ['ability', 'habilidad'], ['sex', 'sexo'], ['types', 'tipos']]
          .filter(([field]) => JSON.stringify(entry[field]) !== JSON.stringify(original[field]))
          .map(([field, label]) => {
            const display = value => (Array.isArray(value) ? value.join(' · ') : value) || 'sin especificar';
            return `${label}: ${display(original[field])} → ${display(entry[field])}`;
          });
        if (fields.length) changes.push(`Pokémon modificado: ${original.name} (${fields.join(', ')})`);
      }
    }
    remaining.forEach(entry => changes.push(`Pokémon eliminado: ${entry.name}`));
    dirty = changes.length > 0;
    if (pendingEntry) changes.push('Formulario de Pokémon en edición: agrégalo, actualízalo o cancélalo antes de guardar.');
    $('unsaved-list').replaceChildren(...changes.map(change => element('li', change)));
    $('unsaved-changes').hidden = !changes.length;
    $('save-collection').disabled = !dirty;
    $('save-collection').classList.toggle('needs-save', dirty);
  }
  function card(entry, editable, index) {
    const node = element('article', undefined, 'card');
    const image = element('img');
    image.src = entry.sprite;
    image.alt = entry.name;
    image.loading = 'lazy';
    const ball = element('p', undefined, 'ball-label');
    const ballSprite = ballSprites.find(item => ballKey(item.name) === ballKey(entry.ball));
    if (ballSprite) {
      const icon = element('img', undefined, 'ball-icon');
      icon.src = ballSprite.sprite;
      icon.alt = '';
      icon.loading = 'lazy';
      ball.append(icon);
    }
    ball.append(document.createTextNode(entry.ball || 'Ball sin especificar'));
    node.append(image, element('h3', entry.name), element('p', entry.types.join(' · ') || 'Tipo sin especificar'),
      ball, element('p', [entry.sex, entry.ability].filter(Boolean).join(' · ') || ''));
    if (editable) {
      node.append(button('Editar', () => {
        if (pendingEntry && !confirm('Hay un Pokémon en edición. ¿Descartar esos cambios?')) return;
        typeRequest++;
        editingIndex = index;
        pendingEntry = true;
        const form = $('add-pokemon');
        form.elements.pokemon.value = entry.name;
        form.elements.ball.value = entry.ball;
        form.elements.ability.value = entry.ability;
        form.elements.sex.value = entry.sex;
        form.elements.type1.value = entry.types[0] || '';
        form.elements.type2.value = entry.types[1] || '';
        $('add-button').textContent = 'Actualizar Pokémon';
        $('cancel-edit').hidden = false;
        renderChanges();
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }), button('Quitar', () => {
        if (!confirm(`¿Quitar ${entry.name} de la colección?`)) return;
        if (pendingEntry && !confirm('Hay un Pokémon en edición. ¿Descartar esos cambios?')) return;
        current.entries.splice(index, 1);
        cancelEdit();
        renderEditable();
        renderChanges();
      }));
    }
    return node;
  }
  function renderEditable() {
    $('editable-cards').replaceChildren(...current.entries.map((entry, index) => card(entry, true, index)));
  }
  function renderPublic() {
    const query = $('search').value.toLowerCase().trim();
    const type = $('type-filter').value;
    const ball = $('ball-filter').value;
    const sort = $('sort').value;
    const entries = current.entries.filter(entry =>
      `${entry.name} ${entry.ability}`.toLowerCase().includes(query) &&
      (!type || entry.types.includes(type)) && (!ball || entry.ball === ball));
    entries.sort((a, b) => {
      const left = sort === 'name' ? a.name : sort === 'type' ? (a.types[0] || '') : a.ball;
      const right = sort === 'name' ? b.name : sort === 'type' ? (b.types[0] || '') : b.ball;
      return left.localeCompare(right) || a.name.localeCompare(b.name);
    });
    $('count').textContent = `${entries.length} Pokémon`;
    $('cards').replaceChildren(...entries.map(entry => card(entry, false)));
  }
  async function showDirectory() {
    $('directory').hidden = false;
    const collections = await api('/collections');
    const links = collections.map(collection => {
      const a = element('a', collection.name, 'card');
      a.href = linkFor(collection.slug);
      return a;
    });
    $('collection-links').replaceChildren(...links);
    if (!links.length) $('collection-links').append(element('p', 'Aún no hay colecciones publicadas.'));
  }
  async function showCollection(slug) {
    current = await api(`/collections/${encodeURIComponent(slug)}`);
    $('public').hidden = false;
    $('collection-name').textContent = current.name;
    document.title = `${current.name} · Fairy Legion`;
    applyTheme(document.body, current.background, current.accent);
    $('public').style.borderColor = current.accent;
    [...new Set(current.entries.map(entry => entry.ball).filter(Boolean))].sort().forEach(ball => option($('ball-filter'), ball));
    renderPublic();
  }
  function cancelEdit() {
    editingIndex = null;
    pendingEntry = false;
    typeLoading = false;
    typeRequest++;
    $('add-pokemon').reset();
    $('add-button').textContent = 'Agregar Pokémon';
    $('cancel-edit').hidden = true;
    renderChanges();
  }
  async function editCollection(id, username) {
    if ((dirty || pendingEntry) && !confirm('Hay cambios sin guardar. ¿Descartarlos?')) return;
    current = await api(`/editor/${id}`);
    editingUser = id;
    $('edit-area').hidden = false;
    $('edit-title').textContent = `Editar colección de ${username}`;
    $('settings').elements.name.value = current.name;
    $('settings').elements.background.value = current.background;
    $('settings').elements.accent.value = current.accent;
    $('public-link').href = linkFor(current.slug);
    renderThemePreview();
    markSaved();
    cancelEdit();
    renderEditable();
  }
  async function loadUsers() {
    const users = await api('/admin/users');
    $('users').replaceChildren(...users.map(user => {
      const row = element('div', undefined, 'member');
      row.append(element('strong', `${user.username} (${user.active ? 'activo' : 'desactivado'})`));
      row.append(button('Editar colección', () => editCollection(user.id, user.username)));
      row.append(button(user.active ? 'Desactivar' : 'Restaurar', async () => {
        if (!confirm(`${user.active ? '¿Desactivar' : '¿Restaurar'} la cuenta de ${user.username}?`)) return;
        await api(`/admin/users/${user.id}/active`, 'PUT', { active: !user.active });
        await loadUsers();
        status('Estado actualizado.');
      }));
      const reset = element('form', undefined, 'form-grid');
      const label = element('label', `Nueva contraseña para ${user.username}`);
      const password = element('input');
      password.type = 'password';
      password.required = true;
      password.minLength = 12;
      password.maxLength = 128;
      password.autocomplete = 'new-password';
      label.append(password);
      const submit = element('button', 'Restablecer contraseña');
      reset.append(label, submit);
      reset.addEventListener('submit', event => {
        event.preventDefault();
        run(async () => {
          await api(`/admin/users/${user.id}/password`, 'PUT', { password: password.value });
          reset.reset();
          status('Contraseña actualizada. Las sesiones anteriores han sido cerradas.');
        });
      });
      row.append(reset);
      return row;
    }));
  }
  async function showAccount(user) {
    $('login-section').hidden = true;
    $('account').hidden = false;
    $('administration').hidden = !user.admin;
    $('edit-area').hidden = true;
    $('account-title').textContent = `Hola, ${user.username}`;
    if (user.admin) {
      await loadUsers();
    } else await editCollection(user.id, user.username);
  }
  $('login').addEventListener('submit', event => {
    event.preventDefault();
    run(async () => {
      const form = event.target;
      const result = await api('/login', 'POST', { username: form.elements.username.value, password: form.elements.password.value });
      form.reset();
      status('');
      await showAccount(result.user);
    });
  });
  $('logout').addEventListener('click', () => run(async () => {
    if ((dirty || pendingEntry) && !confirm('Hay cambios sin guardar. ¿Cerrar sesión de todos modos?')) return;
    await api('/logout', 'POST', {});
    dirty = false;
    pendingEntry = false;
    location.reload();
  }));
  $('settings').addEventListener('input', () => { renderThemePreview(); renderChanges(); });
  document.querySelectorAll('.theme-preset').forEach(preset => {
    preset.style.setProperty('--preset-background', preset.dataset.background);
    preset.style.setProperty('--preset-accent', preset.dataset.accent);
    preset.addEventListener('click', () => {
      $('settings').elements.background.value = preset.dataset.background;
      $('settings').elements.accent.value = preset.dataset.accent;
      renderThemePreview();
      renderChanges();
    });
  });
  $('add-pokemon').addEventListener('input', () => { pendingEntry = true; $('cancel-edit').hidden = false; renderChanges(); });
  document.querySelectorAll('.type-input').forEach(select => select.addEventListener('change', () => { typeRequest++; typeLoading = false; }));
  $('generate-password').addEventListener('click', () => {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    const password = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    const field = $('create-user').elements.password;
    field.type = 'text';
    field.value = password;
    status('Copia la contraseña y compártela por un medio privado antes de crear la cuenta.');
  });
  $('change-password').addEventListener('submit', event => {
    event.preventDefault();
    run(async () => {
      const form = event.target;
      if ((dirty || pendingEntry) && !confirm('Hay cambios sin guardar. ¿Cambiar la contraseña de todos modos?')) return;
      await api('/password', 'PUT', { currentPassword: form.elements.current.value, password: form.elements.password.value });
      form.reset();
      dirty = false;
      pendingEntry = false;
      $('account').hidden = true;
      $('login-section').hidden = false;
      status('Contraseña actualizada. Inicia sesión de nuevo.');
    });
  });
  $('create-user').addEventListener('submit', event => {
    event.preventDefault();
    run(async () => {
      const form = event.target;
      await api('/admin/users', 'POST', { username: form.elements.username.value, password: form.elements.password.value });
      form.reset();
      form.elements.password.type = 'password';
      await loadUsers();
      status('Usuario creado.');
    });
  });
  $('settings').addEventListener('submit', event => {
    event.preventDefault();
    run(async () => {
      const form = event.target;
      if (!dirty) return;
      if (pendingEntry) throw new Error('Agrega o cancela el Pokémon en edición antes de guardar.');
      const payload = { ...current, name: form.elements.name.value, background: form.elements.background.value, accent: form.elements.accent.value };
      $('account').inert = true;
      try {
        current = await api(`/editor/${editingUser}`, 'PUT', payload);
      } finally {
        $('account').inert = false;
      }
      form.elements.name.value = current.name;
      form.elements.background.value = current.background;
      form.elements.accent.value = current.accent;
      renderThemePreview();
      markSaved();
      renderEditable();
      renderChanges();
      status('Colección guardada.');
    });
  });
  $('add-pokemon').elements.pokemon.addEventListener('change', () => run(async () => {
    const request = ++typeRequest;
    typeLoading = false;
    const form = $('add-pokemon');
    const selected = catalog.find(item => item.name.toLowerCase() === form.elements.pokemon.value.trim().toLowerCase());
    if (!selected) return;
    let found = selected.types;
    if (!found.length) {
      // PAdventures-specific forms may not exist in PokéAPI; leave those editable.
      const name = selected.name.toLowerCase().replace(/^(shiny|cloned) /, '').replace(/ /g, '-');
      typeLoading = true;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        const data = await response.json();
        found = data.types.map(item => item.type.name[0].toUpperCase() + item.type.name.slice(1)).filter(type => types.includes(type));
      } catch {
        status('No se pudieron consultar los tipos en PokéAPI. Selecciónalos manualmente.');
      }
    }
    if (request !== typeRequest) return;
    typeLoading = false;
    form.elements.type1.value = found[0] || '';
    form.elements.type2.value = found[1] || '';
  }));
  $('add-pokemon').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.target;
    if (typeLoading) return status('Espera a que termine la consulta de tipos o selecciónalos manualmente.');
    const selected = catalog.find(item => item.name.toLowerCase() === form.elements.pokemon.value.trim().toLowerCase());
    if (!selected) return status('Selecciona un Pokémon del catálogo.');
    const entry = { name: selected.name, sprite: selected.sprite, ball: form.elements.ball.value, ability: form.elements.ability.value, sex: form.elements.sex.value,
      types: [...new Set([form.elements.type1.value, form.elements.type2.value].filter(Boolean))] };
    if (editingIndex === null) current.entries.push(entry);
    else {
      const original = entryOrigins.get(current.entries[editingIndex]);
      if (original) entryOrigins.set(entry, original);
      current.entries[editingIndex] = entry;
    }
    cancelEdit();
    renderEditable();
    renderChanges();
    status('Cambio pendiente: guarda la colección.');
  });
  $('cancel-edit').addEventListener('click', cancelEdit);
  ['search', 'type-filter', 'ball-filter', 'sort'].forEach(id => $(id).addEventListener('input', renderPublic));
  run(async () => {
    const ballResponse = await fetch('data/collection-balls.json');
    if (!ballResponse.ok) throw new Error('No se pudo cargar el catálogo de Balls.');
    ballSprites = await ballResponse.json();
    [...ballSprites.map(item => item.name), ...extraBalls].sort().forEach(ball => option($('balls'), ball));
    const slug = new URLSearchParams(location.search).get('coleccion');
    if (slug) return showCollection(slug);
    const response = await fetch('data/collection-catalog.json');
    if (!response.ok) throw new Error('No se pudo cargar el catálogo de Pokémon.');
    catalog = await response.json();
    catalog.forEach(item => option($('catalog'), item.name));
    await showDirectory();
    const { user } = await api('/session');
    if (user) await showAccount(user); else $('login-section').hidden = false;
  });
})();
