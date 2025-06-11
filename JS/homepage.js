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
//Scrolling Behaviors


const nameFast = document.getElementById("name-move-down");
const nameSlow = document.getElementById("name-move-down-slow");

let lastKnownScrollY = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  lastKnownScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      nameFast.style.transform = `translateY(${lastKnownScrollY * 0.5}px)`;
      nameFast.style.opacity = `${(1000 - lastKnownScrollY) / 4000}`;

      nameSlow.style.transform = `translateY(${lastKnownScrollY * 0.25}px)`;
      nameSlow.style.opacity = `${(1000 - lastKnownScrollY) / 2000}`;

      ticking = false;
    });
    ticking = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.getElementById("scroll-to-projects");
  const targetSection = document.getElementById("projects-section");

  scrollButton.addEventListener("click", () => {
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});



const grid = document.getElementById("pixelGrid");
const cols = 4,
  rows = 6;
const pixels = [];

// Create grid
for (let i = 0; i < cols * rows; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  grid.appendChild(pixel);
  pixels.push(pixel);
}

// Default animation loop
let index = 0;
setInterval(() => {
  pixels.forEach((p) => p.classList.remove("on"));

  // Light up one pixel per frame in sequence
  pixels[index].classList.add("on");
  index = (index + 1) % pixels.length;
}, 500);




  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll('.about-desc-text');
          lines.forEach((line, index) => {
            setTimeout(() => {
              line.classList.add('visible');
            }, index * 200); // Adjust delay as needed
          });
          observer.unobserve(entry.target); // Remove if you want the animation to happen only once
        }
      });
    }, { threshold: 0.5 });

    const section = document.querySelector('.about-desc');
    if (section) {
      observer.observe(section);
    }
  });




