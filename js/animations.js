(function () {
  let revealObserver;

  function setupReveals() {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    document.querySelectorAll(".reveal:not(.visible)").forEach((element) => revealObserver.observe(element));
  }

  function setupCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.counter);
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          element.textContent = Math.floor(progress * target).toLocaleString("en-IN");
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function setupParallax() {
    const cards = document.querySelectorAll(".parallax-card");
    window.addEventListener("scroll", () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const shift = (rect.top - window.innerHeight / 2) * -0.025;
        card.style.transform = `translateY(${shift}px)`;
      });
    }, { passive: true });
  }

  function setupTyping() {
    const target = document.querySelector("[data-typing]");
    if (!target) return;
    const text = target.dataset.typing;
    target.textContent = "";
    [...text].forEach((letter, index) => {
      setTimeout(() => {
        target.textContent += letter;
      }, index * 42);
    });
  }

  window.RiyaaAnimations = { refresh: setupReveals };
  setupReveals();
  setupCounters();
  setupParallax();
  setupTyping();
})();
