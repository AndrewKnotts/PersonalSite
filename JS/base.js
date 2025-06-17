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
      hour12: false,
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

// Detect touch devices (mobile & tablet)
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (window.innerWidth >= 800) {
  const cursorSmall = document.querySelector(".cursor-small");
  const cursorLarge = document.querySelector(".cursor-large");

  let mouseX = 0,
    mouseY = 0;
  let largeX = 0,
    largeY = 0;

  let hasMoved = false;
  let isVisible = false;

  function showCursors() {
    if (!isVisible) {
      cursorSmall.style.display = "block";
      cursorLarge.style.display = "block";

      // Force reflow
      void cursorSmall.offsetWidth;
      void cursorLarge.offsetWidth;

      cursorSmall.style.opacity = "1";
      cursorLarge.style.opacity = "1";
      isVisible = true;
    }
  }

  function hideCursors() {
    if (isVisible) {
      cursorSmall.style.opacity = "0";
      cursorLarge.style.opacity = "0";
      isVisible = false;
    }
  }

  function updateCursorPosition(x, y) {
    mouseX = x;
    mouseY = y;

    cursorSmall.style.left = `${mouseX}px`;
    cursorSmall.style.top = `${mouseY}px`;
  }

  window.addEventListener("mousemove", (e) => {
    updateCursorPosition(e.clientX, e.clientY);

    if (!hasMoved) {
      hasMoved = true;
    }

    if (hasMoved && !isVisible) {
      showCursors();
    }
  });

  function animate() {
    largeX += (mouseX - largeX) * 0.1;
    largeY += (mouseY - largeY) * 0.1;
    cursorLarge.style.left = `${largeX}px`;
    cursorLarge.style.top = `${largeY}px`;
    requestAnimationFrame(animate);
  }
  animate();

  // More reliable mouse leave detection
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
      hideCursors();
    }
  });

  // Mouse enter detection
  document.addEventListener("mouseenter", (e) => {
    if (hasMoved) {
      updateCursorPosition(e.clientX, e.clientY);
      showCursors();
    }
  });

  // Fallback for regaining focus
  window.addEventListener("focus", () => {
    if (hasMoved && !isVisible) {
      showCursors();
    }
  });

  // Visibility change fallback
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && hasMoved && !isVisible) {
      setTimeout(() => {
        if (!isVisible) {
          showCursors();
        }
      }, 50);
    }
  });

  // Hover effect
  const hoverElements = document.querySelectorAll("[data-cursor-hover]");

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (isVisible) {
        cursorLarge.style.opacity = "0";
        cursorSmall.style.transform = "translate(-50%, -50%) scale(3)";
      }
    });
    el.addEventListener("mouseleave", () => {
      if (isVisible) {
        cursorLarge.style.opacity = "1";
        cursorSmall.style.transform = "translate(-50%, -50%) scale(1)";
      }
    });
  });
} else {
  // Optionally, hide cursor elements entirely on mobile
  document.querySelectorAll(".cursor-small, .cursor-large").forEach((el) => {
    el.style.display = "none";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Global stuff still runs immediately
  observeReveals(".reveal-wrapper:not(.contact-section .reveal-wrapper)");
  observeFadeSlideUps(".fade-slide-up:not(.contact-section .fade-slide-up)");

  let contactActivated = false;

  window.addEventListener("scroll", () => {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

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

const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });
}

document.getElementById("contact-link").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the anchor's default behavior
  const contactSection = document.getElementById("contact-section");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
});

document.getElementById("contact-link-2").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the anchor's default behavior
  const contactSection = document.getElementById("contact-section");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
    hamburgerBtn.click();
  }
});



  const originalTitle = document.title;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "Come back soon?";
    } else {
      document.title = originalTitle;
    }
  });

console.log("%cHey! What are you doing in here? 👀\nIf you're that curious, reach out to me at knottsan2010@gmail.com.", "color: blue; font-size: 20px;");
