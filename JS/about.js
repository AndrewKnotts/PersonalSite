function runSequentialFadeInWhenVisible(containerSelector, itemSelector = ".fade-slide-up", delayBetween = 400) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const elements = container.querySelectorAll(itemSelector);

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start the sequence
          let i = 0;

          function revealNext() {
            if (i >= elements.length) return;
            const el = elements[i];
            el.classList.add("visible");

            setTimeout(() => {
              i++;
              revealNext();
            }, delayBetween);
          }

          revealNext();

          // Only trigger once
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Adjust how much of the container must be visible
    }
  );

  observer.observe(container);
}

runSequentialFadeInWhenVisible(".as-landing-text", ".fade-slide-up-s", 200);
runSequentialFadeInWhenVisible(".a-skill-section", ".fade-slide-up-s", 200);



// profile pic effect

document.addEventListener('DOMContentLoaded', (event) => {
    const imageContainer = document.getElementById('profile_pic_container');
    const image = document.getElementById('profile_image');
    
    // Define the image sources
    const initialImageSrc = '../assets/AnimatedGraphics/Profile_sprite_default2.gif'
    const hoverImageSrc = '../assets/AnimatedGraphics/Profile_sprite_hover.png';
    const clickImageSrc = '../assets/AnimatedGraphics/Profile_sprite_click.png';
    
    // Change image on hover
    imageContainer.addEventListener('mouseover', () => {
        image.src = hoverImageSrc;
    });

    // Revert image when not hovering
    imageContainer.addEventListener('mouseout', () => {
        image.src = initialImageSrc;
    });

   // Change image on click
    imageContainer.addEventListener('click', () => {
        image.src = clickImageSrc;
        
        // Revert image after 1 second
        setTimeout(() => {
            image.src = initialImageSrc;
        }, 1000);
    });
});
