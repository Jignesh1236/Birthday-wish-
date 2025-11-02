// Touch and swipe functionality
let startY = 0;
let currentY = 0;
let isDragging = false;
let currentPage = 0;

const page0 = document.getElementById('page0');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const startBtn = document.getElementById('startBtn');

// Button click to go to page 1
startBtn.addEventListener('click', () => {
  currentPage = 1;
  page0.style.display = 'none';
  page1.classList.add('active');
});

// Touch start
document.addEventListener('touchstart', (e) => {
  if (currentPage !== 1) return;
  startY = e.touches[0].clientY;
  isDragging = true;
}, { passive: true });

// Touch move
document.addEventListener('touchmove', (e) => {
  if (!isDragging || currentPage !== 1) return;
  currentY = e.touches[0].clientY;
}, { passive: true });

// Touch end
document.addEventListener('touchend', (e) => {
  if (!isDragging || currentPage !== 1) return;
  
  const deltaY = startY - currentY;
  
  // If swiped up more than 100px, go to page 2
  if (deltaY > 100) {
    goToPage2();
  }
  
  isDragging = false;
}, { passive: true });

// Mouse events for desktop testing
let mouseDown = false;
let startMouseY = 0;

document.addEventListener('mousedown', (e) => {
  if (currentPage !== 1) return;
  mouseDown = true;
  startMouseY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (!mouseDown || currentPage !== 1) return;
  currentY = e.clientY;
});

document.addEventListener('mouseup', (e) => {
  if (!mouseDown || currentPage !== 1) return;
  
  const deltaY = startMouseY - currentY;
  
  if (deltaY > 100) {
    goToPage2();
  }
  
  mouseDown = false;
});

// Go to page 2 with blur and wipe transition
function goToPage2() {
  currentPage = 2;
  page2.classList.add('active');
}

// Prevent default scroll behavior
document.body.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
