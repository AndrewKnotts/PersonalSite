// const pixelSize = 10;
//     let particles = [];

//     function setup() {
//       const canvas = createCanvas(windowWidth, windowHeight);
//       canvas.addClass('pixel-canvas'); // 👈 your custom class
//       noStroke();
//       rectMode(CENTER);
//     }

//     function draw() {
//       background(0, 0, 0, 25);  // semi-transparent for a subtle trail fade
      


      

//       // Draw and update all particles
//       for (let i = particles.length - 1; i >= 0; i--) {
//         const p = particles[i];
//         fill(255, 255, 255, p.alpha); // cyan glow

//         rect(p.x, p.y, pixelSize, pixelSize);


//         p.alpha -= .1; // fade out
//         p.scale -= 0.99; // optional shrink effect

//         if (p.alpha <= 0) {
//           particles.splice(i, 1); // remove faded particles
//         }
//       }
//     }
 


//     function mouseMoved() {
//       const x = Math.floor(mouseX / pixelSize) * pixelSize;
//       const y = Math.floor(mouseY / pixelSize) * pixelSize;

//       particles.push({
//         x: x,
//         y: y,
//         alpha: 5,
//         scale: 1
//       });
//     }

//     function windowResized() {
//       resizeCanvas(windowWidth, windowHeight);
//     }






const cursorSmall = document.querySelector('.cursor-small');
const cursorLarge = document.querySelector('.cursor-large');

let mouseX = 0, mouseY = 0;
let largeX = 0, largeY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorSmall.style.left = `${mouseX}px`;
  cursorSmall.style.top = `${mouseY}px`;

  // Make sure cursors are visible again
  cursorSmall.style.opacity = '1';
  cursorLarge.style.opacity = '1';
});

function animate() {
  largeX += (mouseX - largeX) * 0.08;
  largeY += (mouseY - largeY) * 0.08;
  cursorLarge.style.left = `${largeX}px`;
  cursorLarge.style.top = `${largeY}px`;
  requestAnimationFrame(animate);
}
animate();

// Hide cursors when mouse leaves the window
window.addEventListener('mouseout', (e) => {
  if (!e.relatedTarget && !e.toElement) {
    cursorSmall.style.opacity = '0';
    cursorLarge.style.opacity = '0';
  }
});

// Hover effect on custom elements
const hoverElements = document.querySelectorAll('[data-cursor-hover]');

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorLarge.style.opacity = '0';
    cursorSmall.style.transform = 'translate(-50%, -50%) scale(3)';
  });
  el.addEventListener('mouseleave', () => {
    cursorLarge.style.opacity = '1';
    cursorSmall.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
