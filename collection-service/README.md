# Colecciones Fairy Legion

The static site and this service are separate from Viajes Chukum. The service uses a SQLite database in a Docker volume, not the travel project's database. The two existing collection pages remain unchanged; their Pokémon seed the shared catalog, not new user accounts.

## What this provides

The administrator creates accounts and initial passwords, can reset passwords, edit any member's collection, and deactivate or restore accounts. Deactivation hides the public page, blocks login and revokes sessions without deleting collection data. Members can change their passwords. Existing member sessions are revoked after a password reset.

Each member has one public page at `https://www.fairylegion.com/colecciones.html?coleccion=USERNAME`. Visitors can search, filter and sort it. Account names are lowercase letters, digits, underscores or hyphens; names also determine the public slug. Collection edits use version numbers to reject conflicting saves. Usernames are not secret, and collections are public.

## Catalog and sprites

`data/collection-catalog.json` is generated from Pokémon cards in both original collection pages, plus images in `collection-sprites/`. To add a sprite, commit a GIF, PNG or WebP to that dedicated folder with a descriptive filename, e.g. `shinyPikachu.gif` or `Shiny Pikachu.gif`. Camel case, underscores and hyphens become spaces in the displayed name. Names must start with a letter and use only letters, digits, spaces, underscores, hyphens, apostrophes, parentheses and periods. Check the resulting name; filenames cannot reliably express every PAdventures form. Existing names take priority over new duplicates.

Run `node tools/generate-collection-catalog.cjs` from the repository root to regenerate locally. The catalog workflow also regenerates on pushes to `main` and requests a Pages build after committing changes. It needs Actions permission to write contents and Pages, and a branch that permits its push; failed runs need attention. New sprites and the generated catalog must both be published before visitors can use them.

Types found in the existing pages or `pokemon-types.json` take priority. For a selected catalog entry without types, the editor tries PokéAPI using the name (removing a leading Shiny or Cloned). PokéAPI does not know all PAdventures variants and can be unavailable; users can select or correct types manually. Ability and ball are entered independently, since game-specific options are not guaranteed by PokéAPI.

The same generator builds `data/collection-balls.json` from `ColeccionSilvarion/icon-*.gif`. Ball names in the editor and public collections are matched case-insensitively (including accented Poké Ball); custom names without a matching sprite remain visible as text. New ball sprites require the generated manifest to be published alongside them. The editor lists differences from the last saved collection and highlights the save button; a Pokémon form in progress must be added or cancelled before saving.

Collection colors produce a gradient on the public page. The editor provides color presets and a live preview; presets set the same two stored colors and do not require a database change. The save button is disabled when there are no applied changes, and becomes available when settings or collection entries differ from the last save.

## Deployment prerequisites

This code has **not** been deployed or verified against the existing droplet. Before installing, check free disk, RAM, port availability, existing proxy, DNS, firewall and backups. It listens only on `127.0.0.1:8081` on the host by default; change the host port in `compose.yml` if occupied. Keep the port private and put it behind an HTTPS reverse proxy. Docker needs permission to write its named volume. Do not mount this service over the Viajes Chukum volumes or reuse its credentials.

1. Publish the static site and point `api.fairylegion.com` to the droplet. Configure the existing HTTPS proxy with a **separate hostname** that forwards to `http://127.0.0.1:8081`, obtain a valid certificate, and preserve the existing travel site configuration. The actual proxy and certificate setup must be adapted to the server; do not point wildcard DNS at GitHub Pages.
2. Deploy a copy of this repository to the droplet, then from its `collection-service` directory run `docker compose up -d --build`. Verify `curl http://127.0.0.1:8081/health`, then `curl https://api.fairylegion.com/health`. Both should return `{"ok":true}`. The browser app expects the latter exact hostname in `colecciones.js`; adjust it deliberately if using another hostname.
3. Create the first admin once, on the server. In a shell that supports `read -s`, from `collection-service`:

   ```bash
   read -r -s -p 'Initial admin password (at least 12 characters): ' FAIRY_PASSWORD; echo
   printf '%s' "$FAIRY_PASSWORD" | docker compose exec -T collections node server.cjs init-admin admin
   unset FAIRY_PASSWORD
   ```

   Change `admin` to the desired lowercase username. The initializer refuses to create another admin once one exists. Don't put passwords in the repository, command arguments or environment files. Sign in at `/colecciones.html` on `https://www.fairylegion.com` and create member accounts. Deliver their passwords privately.

The API accepts credentialed browser requests only from the configured `COLLECTION_ORIGIN` and checks `Origin` on state-changing requests. Cookies require HTTPS and are `HttpOnly`, `Secure`, and `SameSite=Lax`. The configured origin must match the browser's exact scheme and hostname. The web and API hosts are intended to be same-site subdomains; third-party cookie blocking may prevent other arrangements. Do not enable `COLLECTION_INSECURE_LOCAL` in production.

Passwords are salted and hashed with scrypt; session tokens are random and stored hashed. Login attempts are limited in process memory; this is a small single-instance service, not a distributed rate limiter. Configure additional proxy-level limits and monitoring for internet exposure. Keep the container and Node image updated. The SQLite implementation requires Node 24 and currently emits Node's experimental SQLite warning.

## Backups and recovery

The volume survives container rebuilds but **not** loss of the droplet. Schedule and test off-server backups; the snapshot includes password hashes and should be encrypted and access-restricted. The following takes a consistent online SQLite backup, including committed WAL changes, and copies it to the host. Run from `collection-service`:

```bash
stamp=$(date +%Y%m%d-%H%M%S)
docker compose exec -T collections node backup.cjs "/data/backup-$stamp.sqlite"
docker compose cp "collections:/data/backup-$stamp.sqlite" "./backup-$stamp.sqlite"
```

After confirming the host copy, remove that exact temporary backup from `/data`, and move the host copy to encrypted off-server storage. To restore, stop only this service, restore the verified database into its volume as `collections.sqlite` with ownership writable by the container's `node` user, remove the old SQLite `-wal` and `-shm` files only after preserving the current database, then restart and verify. Practice recovery before relying on backups. Never copy a live SQLite database without its WAL; use the backup utility above.

## Validation

Run `node --test collection-service/server.test.cjs collection-service/backup.test.cjs tools/collection-catalog.test.cjs` and `node tools/generate-collection-catalog.cjs`. Deployment, HTTPS, DNS and Actions permissions still need to be tested on their actual infrastructure.
