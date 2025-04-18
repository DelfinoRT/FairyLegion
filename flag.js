// flag.js
document.addEventListener('DOMContentLoaded', function() {
  const flagElement = document.getElementById('floating-lgbt-flag');
  const message = "Danierin representante de la comunidad LGBT, la guild te apoya chica!";
  flagElement.textContent = message; // Set the text content

  let x = 20; // Initial X position
  let y = 20; // Initial Y position
  let dx = 1;  // Speed and direction for X
  let dy = 1;  // Speed and direction for Y
  const speed = 0.5; // Adjust for overall speed

  function moveFlag() {
    x += dx * speed;
    y += dy * speed;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const flagWidth = flagElement.offsetWidth;
    const flagHeight = flagElement.offsetHeight;

    // Bounce off the edges
    if (x + flagWidth > windowWidth || x < 0) {
      dx = -dx;
    }
    if (y + flagHeight > windowHeight || y < 0) {
      dy = -dy;
    }

    flagElement.style.left = `${x}px`;
    flagElement.style.bottom = `${windowHeight - y - flagHeight}px`; // Use bottom for consistent positioning

    requestAnimationFrame(moveFlag);
  }

  moveFlag();
});