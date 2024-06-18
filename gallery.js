document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    let currentIndex = 0;

    // Set total images count
    totalImagesSpan.textContent = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
        // Update counter
        currentImageSpan.textContent = index + 1;
    }

    window.nextImage = function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    window.prevImage = function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };

    // Initial display
    showImage(currentIndex);
});
