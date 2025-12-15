document.querySelectorAll('.collapsible-header').forEach(btn => {
  btn.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const arrow = this.querySelector('.arrow');
    if (content.style.display === 'block') {
      content.style.display = 'none';
      arrow.textContent = '▼';
    } else {
      content.style.display = 'block';
      arrow.textContent = '▲';
    }
  });
});
