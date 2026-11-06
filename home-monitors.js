// Reuse sprite nodes and animate only while the collections are visible.
(() => {
    const paths = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 'gengar', 'lapras', 'eevee'];
    const containers = ['mini-monitor-sprites', 'mini-monitor-sprites-nemesis']
        .map(id => document.getElementById(id)).filter(Boolean);
    const section = document.getElementById('collections');
    if (!section || !containers.length) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer;
    let initialized = false;
    function update() {
        containers.forEach(container => {
            if (!container.children.length) {
                for (let i = 0; i < 5; i++) {
                    const img = document.createElement('img');
                    img.alt = '';
                    img.width = img.height = 28;
                    img.style.imageRendering = 'pixelated';
                    container.appendChild(img);
                }
            }
            Array.from(container.children).forEach(img => {
                const src = `PokeLegion/Pokemon/${paths[Math.floor(Math.random() * paths.length)]}.png`;
                if (img.getAttribute('src') !== src) img.src = src;
            });
        });
        initialized = true;
    }
    function sync() {
        clearInterval(timer);
        if (!visible || document.hidden) return;
        if (!initialized) update();
        if (!reducedMotion.matches) timer = setInterval(update, 650);
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(section);
    } else { visible = true; sync(); }
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
})();
