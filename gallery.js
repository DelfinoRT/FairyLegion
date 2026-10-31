document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    const images = Array.from(gallery.querySelectorAll('img'));
    if (!images.length) return;
    const current = document.getElementById('currentImage');
    const total = document.getElementById('totalImages');
    const original = document.getElementById('gallery-original');
    let currentIndex = 0;
    let visible = false;
    function loadImage(image) {
        if (image.dataset.src && !image.getAttribute('src')) image.src = image.dataset.src;
    }
    function showImage(index) {
        images[currentIndex].classList.remove('active');
        currentIndex = (index + images.length) % images.length;
        const image = images[currentIndex];
        image.classList.add('active');
        if (visible) loadImage(image);
        if (current) current.textContent = currentIndex + 1;
        if (original) original.href = image.dataset.original || image.dataset.src || image.src;
    }
    if (total) total.textContent = images.length;
    window.nextImage = () => { visible = true; showImage(currentIndex + 1); };
    window.prevImage = () => { visible = true; showImage(currentIndex - 1); };
    showImage(0);
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                visible = true;
                loadImage(images[currentIndex]);
                observer.disconnect();
            }
        }, { rootMargin: '200px' });
        observer.observe(gallery);
    } else {
        visible = true;
        loadImage(images[currentIndex]);
    }
});
