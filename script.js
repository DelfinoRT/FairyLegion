document.querySelector('.menu-btn').addEventListener('click', function() {
    const nav = document.querySelector('.nav ul');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
});

window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav ul');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});

window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 100) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function createStar() {
    const star = document.createElement('div');
    star.textContent = '✦';
    star.classList.add('star');
    document.body.appendChild(star);

    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function sprinkleFairyDust() {
    const numberOfStars = 3;
    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
}

setInterval(sprinkleFairyDust, 500);

function createStary() {
    const star = document.createElement('div');
    star.textContent = '✦';
    star.classList.add('stary');
    document.body.appendChild(star);

    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function sprinkleFairyDusty() {
    const numberOfStars = 2;
    for (let i = 0; i < numberOfStars; i++) {
        createStary();
    }
}

setInterval(sprinkleFairyDusty, 500);
