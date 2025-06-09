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
runSequentialFadeInWhenVisible(".project-landing-text", ".fade-slide-up-s", 200);



