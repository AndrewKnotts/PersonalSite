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

runSequentialFadeInWhenVisible(".project-landing-text", ".fade-slide-up-s", 200);





//VIDEO PLAYING


  document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".smart-video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((e) => console.warn("Autoplay failed:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 } // Play when 60% visible
    );

    videos.forEach((video) => {
      video.controls = false;
      video.loop = true;
      observer.observe(video);

      video.addEventListener("mouseenter", () => {
        video.controls = true;
      });

      video.addEventListener("mouseleave", () => {
        video.controls = false;
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".smart-video");

    videos.forEach((video) => {
      video.controls = false;

      video.addEventListener("mouseenter", () => {
        video.controls = true;
      });

      video.addEventListener("mouseleave", () => {
        video.controls = false;
      });
    });
  });