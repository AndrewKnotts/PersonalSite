document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-slide-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || "0s";
          el.style.transitionDelay = delay;
          el.classList.add("visible");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".image-reveal-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          const image = wrapper.querySelector(".image-reveal");
          const delay = wrapper.dataset.delay || "0s";
          image.style.transitionDelay = delay;
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
