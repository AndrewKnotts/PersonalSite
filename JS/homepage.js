const pixelSize = 10;
    let particles = [];

    function setup() {
      const canvas = createCanvas(windowWidth, windowHeight);
      canvas.addClass('pixel-canvas'); // 👈 your custom class
      noStroke();
      rectMode(CENTER);
    }

    function draw() {
      background(0, 0, 0, 25);  // semi-transparent for a subtle trail fade
      


      

      // Draw and update all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        fill(255, 255, 255, p.alpha); // cyan glow

        rect(p.x, p.y, pixelSize, pixelSize);


        p.alpha -= .1; // fade out
        p.scale -= 0.99; // optional shrink effect

        if (p.alpha <= 0) {
          particles.splice(i, 1); // remove faded particles
        }
      }
    }
 


    function mouseMoved() {
      const x = Math.floor(mouseX / pixelSize) * pixelSize;
      const y = Math.floor(mouseY / pixelSize) * pixelSize;

      particles.push({
        x: x,
        y: y,
        alpha: 5,
        scale: 1
      });
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }