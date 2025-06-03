function observeFadeSlideUps(selector) {
  const elements = document.querySelectorAll(".fade-slide-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || "0s";
          el.style.transitionDelay = delay;
          el.classList.add("visible");

          // Clean up will-change after animation
          setTimeout(() => {
            el.style.willChange = "auto";
          }, 600 + parseFloat(delay) * 1000); // 600ms + delay

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((el) => observer.observe(el));
}
function observeReveals(selector) {
  const wrappers = document.querySelectorAll(".reveal-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const inners = wrapper.querySelectorAll(".slide-up-reveal-inner");

          inners.forEach((inner) => {
            const delay = inner.dataset.delay || "0s";
            inner.style.transitionDelay = delay;
          });

          wrapper.classList.add("visible");
          observer.unobserve(wrapper);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  wrappers.forEach((wrapper) => observer.observe(wrapper));
}

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".image-reveal-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const image = wrapper.querySelector(".image-reveal");
          const delay = wrapper.dataset.delay || "0s";

          // Apply the initial delay for entrance animation
          image.style.transitionDelay = delay;
          wrapper.classList.add("visible");

          // After delay is done, remove transition delay so hover feels natural
          const delayMs = parseFloat(delay) * (delay.includes("ms") ? 1 : 1000); // convert to ms if needed
          setTimeout(() => {
            image.style.transitionDelay = ""; // remove it
          }, delayMs);

          observer.unobserve(wrapper);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  wrappers.forEach((wrapper) => observer.observe(wrapper));
});

document.addEventListener("DOMContentLoaded", () => {
  const clockEl = document.getElementById("clock");
  const timeSpentEl = document.getElementById("time-spent");
  const locationEl = document.getElementById("location");

  // Cookie helpers
  function getTimeFromCookie() {
    const match = document.cookie.match(/(^|;\s*)timeSpent=(\d+)/);
    return match ? parseInt(match[2], 10) : 0;
  }

  function setTimeInCookie(seconds) {
    document.cookie = `timeSpent=${seconds}; max-age=31536000; path=/`;
  }

  let timeSpentTotal = getTimeFromCookie();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  }

  function updateClock() {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short", // adds time zone abbreviation
    });

    const clock = formatter.format(now);

    clockEl.textContent = `${clock}`;
    timeSpentEl.textContent = `TIME: ${formatTime(timeSpentTotal)}`;
  }

  // Start live updates
  setInterval(() => {
    timeSpentTotal++;
    setTimeInCookie(timeSpentTotal);
    updateClock();
  }, 1000);

  updateClock(); // First draw immediately

  // Fetch user location (city + country in uppercase)
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((loc) => {
      const city = loc.city ? loc.city.toUpperCase() : "";
      const country = loc.country_name ? loc.country_name.toUpperCase() : "";
      const text = `${city}`;
      locationEl.textContent = text;
      locationEl.classList.add("visible");
    })
    .catch((err) => {
      console.warn("Location lookup failed", err);
    });
});

const cursorSmall = document.querySelector(".cursor-small");
const cursorLarge = document.querySelector(".cursor-large");

let mouseX = 0,
  mouseY = 0;
let largeX = 0,
  largeY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorSmall.style.left = `${mouseX}px`;
  cursorSmall.style.top = `${mouseY}px`;

  // Make sure cursors are visible again
  cursorSmall.style.opacity = "1";
  cursorLarge.style.opacity = "1";
});

function animate() {
  largeX += (mouseX - largeX) * 0.1;
  largeY += (mouseY - largeY) * 0.1;
  cursorLarge.style.left = `${largeX}px`;
  cursorLarge.style.top = `${largeY}px`;
  requestAnimationFrame(animate);
}
animate();

// Hide cursors when mouse leaves the window
window.addEventListener("mouseout", (e) => {
  if (!e.relatedTarget && !e.toElement) {
    cursorSmall.style.opacity = "0";
    cursorLarge.style.opacity = "0";
  }
});

// Hover effect on custom elements
const hoverElements = document.querySelectorAll("[data-cursor-hover]");

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorLarge.style.opacity = "0";
    cursorSmall.style.transform = "translate(-50%, -50%) scale(3)";
  });
  el.addEventListener("mouseleave", () => {
    cursorLarge.style.opacity = "1";
    cursorSmall.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Global stuff still runs immediately
  observeReveals(".reveal-wrapper:not(.contact-section .reveal-wrapper)");
  observeFadeSlideUps(".fade-slide-up:not(.contact-section .fade-slide-up)");

  let contactActivated = false;

  window.addEventListener("scroll", () => {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

    if (scrollBottom && !contactActivated) {
      contactActivated = true;
      console.log("WHAHAHAHHAAH");

      // Remove .not-ready so they can animate
      document.querySelectorAll(".contact-section .not-ready").forEach((el) => el.classList.remove("not-ready"));

      // Now activate the observers
      observeReveals(".contact-section .reveal-wrapper");
      observeFadeSlideUps(".contact-section .fade-slide-up");
    }
  });
});



  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });