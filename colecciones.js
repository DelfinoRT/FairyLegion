'use strict';

(() => {
  const API = 'https://api.fairylegion.com';
  const $ = id => document.getElementById(id);
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  const balls = ['Aerial', 'Ancient', 'Beast', 'Cherish', 'Crystal', 'Dive', 'Dream', 'Friend', 'Great', 'Heavy', 'Master', 'Moon', 'Moss', 'Mythic', 'Poké', 'Premier', 'Prism', 'Rocket', 'Ultra'].map(name => `${name} Ball`);
  const status = text => { $('status').textContent = text; };
  const option = (parent, value) => parent.append(new Option(value, value));
  types.forEach(type => { option($('type-filter'), type); document.querySelectorAll('.type-input').forEach(select => option(select, type)); });
  balls.forEach(ball => option($('balls'), ball));
  let catalog = [];
  let current = null;
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
  function card(entry, editable, index) {
    const node = element('article', undefined, 'card');
    const image = element('img');
    image.src = entry.sprite;
    image.alt = entry.name;
    image.loading = 'lazy';
    node.append(image, element('h3', entry.name), element('p', entry.types.join(' · ') || 'Tipo sin especificar'),
      element('p', entry.ball || 'Ball sin especificar'), element('p', [entry.sex, entry.ability].filter(Boolean).join(' · ') || ''));
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
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }), button('Quitar', () => {
        if (!confirm(`¿Quitar ${entry.name} de la colección?`)) return;
        if (pendingEntry && !confirm('Hay un Pokémon en edición. ¿Descartar esos cambios?')) return;
        current.entries.splice(index, 1);
        dirty = true;
        cancelEdit();
        renderEditable();
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
    document.body.style.background = current.background;
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
  }
  async function editCollection(id, username) {
    if ((dirty || pendingEntry) && !confirm('Hay cambios sin guardar. ¿Descartarlos?')) return;
    current = await api(`/editor/${id}`);
    editingUser = id;
    dirty = false;
    cancelEdit();
    $('edit-area').hidden = false;
    $('edit-title').textContent = `Editar colección de ${username}`;
    $('settings').elements.name.value = current.name;
    $('settings').elements.background.value = current.background;
    $('settings').elements.accent.value = current.accent;
    $('public-link').href = linkFor(current.slug);
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
  $('settings').addEventListener('input', () => { dirty = true; });
  $('add-pokemon').addEventListener('input', () => { pendingEntry = true; $('cancel-edit').hidden = false; });
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
      if (pendingEntry) throw new Error('Agrega o cancela el Pokémon en edición antes de guardar.');
      current.name = form.elements.name.value;
      current.background = form.elements.background.value;
      current.accent = form.elements.accent.value;
      current = await api(`/editor/${editingUser}`, 'PUT', current);
      dirty = false;
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
    if (editingIndex === null) current.entries.push(entry); else current.entries[editingIndex] = entry;
    dirty = true;
    cancelEdit();
    renderEditable();
    status('Cambio pendiente: guarda la colección.');
  });
  $('cancel-edit').addEventListener('click', cancelEdit);
  ['search', 'type-filter', 'ball-filter', 'sort'].forEach(id => $(id).addEventListener('input', renderPublic));
  run(async () => {
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
