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
const circleFast = document.getElementById("circle-move-down");
const circleSlow = document.getElementById("circle-move-down-slow");

let lastKnownScrollY = 0;
let ticking = false;

window.addEventListener("scroll", () => {
  lastKnownScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = lastKnownScrollY;

      // Fast elements
      if (nameFast) {
        nameFast.style.transform = `translateY(${y * 0.5}px)`;
        nameFast.style.opacity = `${(1000 - y) / 4000}`;
      }
      if (circleFast) {
        circleFast.style.transform = `translateY(${y * 0.5}px)`;
        circleFast.style.opacity = `${(1000 - y) / 4000}`;
      }

      // Slow elements
      if (nameSlow) {
        nameSlow.style.transform = `translateY(${y * 0.25}px)`;
        nameSlow.style.opacity = `${(1000 - y) / 2000}`;
      }
      if (circleSlow) {
        circleSlow.style.transform = `translateY(${y * 0.25}px)`;
        circleSlow.style.opacity = `${(1000 - y) / 2000}`;
      }

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



// const grid = document.getElementById("pixelGrid");
// const cols = 4,
//   rows = 6;
// const pixels = [];

// // Create grid
// for (let i = 0; i < cols * rows; i++) {
//   const pixel = document.createElement("div");
//   pixel.classList.add("pixel");
//   grid.appendChild(pixel);
//   pixels.push(pixel);
// }

// // Default animation loop
// let index = 0;
// setInterval(() => {
//   pixels.forEach((p) => p.classList.remove("on"));

//   // Light up one pixel per frame in sequence
//   pixels[index].classList.add("on");
//   index = (index + 1) % pixels.length;
// }, 500);

const pupils = document.querySelectorAll('.pupil');
const eyes = document.querySelectorAll('.eye-l, .eye-r');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateEyes() {
  eyes.forEach((eye, i) => {
    const pupil = pupils[i];
    const rect = eye.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;

    const angle = Math.atan2(dy, dx);
    const maxDist = rect.width * 0.2;

    const targetX = Math.cos(angle) * maxDist;
    const targetY = Math.sin(angle) * maxDist;

    // Smooth transition using lerping
    const currentTransform = pupil.style.transform.match(/translate\(([-0-9.]+)px, ([-0-9.]+)px\)/);
    let currentX = 0, currentY = 0;
    if (currentTransform) {
      currentX = parseFloat(currentTransform[1]);
      currentY = parseFloat(currentTransform[2]);
    }

    const lerp = (start, end, amt) => start + (end - start) * amt;

    const newX = lerp(currentX, targetX, 0.1);
    const newY = lerp(currentY, targetY, 0.1);

    pupil.style.transform = `translate(${newX}px, ${newY}px)`;
  });

  requestAnimationFrame(updateEyes);
}

updateEyes();










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





//Loader Overlay

window.addEventListener('load', () => {
    const loaderOverlay = document.querySelector('.loader-overlay');

    if (!sessionStorage.getItem('intro_shown')) {
      // Mark it so it doesn't show again this session
      sessionStorage.setItem('intro_shown', 'true');

      setTimeout(() => {
        loaderOverlay.classList.add('hide');
        setTimeout(() => {
          document.body.style.overflow = 'auto';
        }, 1000);
      }, 2000); // delay for animation
    } else {
      // Skip animation immediately
      loaderOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });