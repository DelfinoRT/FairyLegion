# Copia del perfil oficial del gremio

La portada carga `data/guild.json`, una copia del perfil público de Fairy Legion
y de las habilidades generales obtenidas de PAdventures.
La fecha y los jugadores conectados corresponden a la última consulta realizada,
no a datos en tiempo real. La lista completa de miembros está disponible en el
enlace oficial.

El flujo `.github/workflows/update-guild.yml` consulta el perfil una vez al día
(06:17 UTC) y también puede ejecutarse manualmente desde GitHub Actions. Utiliza
una sesión anónima y consulta únicamente datos públicos; no almacena cookies
ni el token temporal. Se identifica como `FairyLegionGuildSnapshot/1.0`.

El actualizador verifica el perfil y todas las páginas de habilidades generales
antes de reemplazar el archivo. Si falla una consulta o la
validación, el flujo falla y conserva la última copia válida.
Para probarlo localmente se requiere Node.js 24 o posterior:

```sh
node --test tools/update-guild-snapshot.test.cjs
node tools/update-guild-snapshot.cjs
```

El flujo necesita permiso para escribir en la rama predeterminada y permiso de
Pages para solicitar una publicación explícita tras guardar la copia. Una
protección de rama puede impedir el push. Un commit hecho con `GITHUB_TOKEN` no
activa automáticamente otro flujo de despliegue; por eso se solicita la
compilación de Pages mediante su API. Si falla ese paso, revisar los permisos y
la configuración de GitHub Pages antes de volver a ejecutar el flujo.

El `robots.txt` consultado no incluye reglas para este identificador. No se
encontró una política pública específica que autorice o prohíba esta frecuencia;
la consulta diaria es conservadora, pero no sustituye la autorización del
operador del sitio. Si PAdventures establece límites o condiciones, deben
respetarse.
