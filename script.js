const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');

let startX = 0; // Track starting position of drag
let dragging = false; // Track drag state

// Open menu and hide menu icon
menuIcon.addEventListener('click', () => {
  sideMenu.classList.add('active');
  menuIcon.style.display = 'none';
});

// Handle touch drag
sideMenu.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  dragging = true;
});

sideMenu.addEventListener('touchmove', (e) => {
  if (dragging) {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    // Allow dragging to the left only
    if (deltaX < 0) {
      sideMenu.style.transform = `translateX(${300 + deltaX}px)`;
    }
  }
});

sideMenu.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  dragging = false;

  // Close menu if dragged far enough
  if (endX < startX - 100) {
    sideMenu.classList.remove('active');
    menuIcon.style.display = 'block';
    sideMenu.style.transform = ''; // Reset position
  } else {
    // Snap back to open position
    sideMenu.style.transform = 'translateX(300px)';
  }
});
