(function () {
  const navLinks = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["services.html", "Services"],
    ["academy.html", "Academy"],
    ["gallery.html", "Gallery"],
    ["testimonials.html", "Testimonials"],
    ["contact.html", "Contact"]
  ];

  const currentPage = location.pathname.split("/").pop() || "index.html";
  const header = document.querySelector("[data-header]");

  function buildHeader() {
    if (!header || header.children.length) return;
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="RIYAA MAKEOVERS home">
        <span class="brand-mark">RM</span>
        <span>RIYAA MAKEOVERS</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" data-nav>
        ${navLinks.map(([href, label]) => `<a href="${href}" class="${href === currentPage ? "active" : ""}">${label}</a>`).join("")}
      </nav>
      <button class="theme-toggle" type="button" aria-label="Toggle dark mode" data-theme-toggle>Moon</button>
    `;
  }

  function buildFooter() {
    document.querySelectorAll(".site-footer").forEach((footer) => {
      footer.innerHTML = `
        <div>
          <h3>RIYAA MAKEOVERS</h3>
          <p>Luxury salon, bridal artistry, and professional makeup academy built around confidence, care, and premium technique.</p>
        </div>
        <div><strong>Quick Links</strong>${navLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div>
        <div><strong>Working Hours</strong><p>Mon - Sat: 10:00 AM - 8:00 PM</p><p>Sunday: Bridal bookings only</p></div>
        <div><strong>Contact</strong><p>+91 00000 00000</p><p>hello@riyaamakeovers.com</p><p>Instagram | Facebook | WhatsApp</p></div>
        <div class="footer-bottom">Copyright 2026 RIYAA MAKEOVERS. All rights reserved.</div>
      `;
    });
  }

  function setHeaderState() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    const progress = document.querySelector(".scroll-progress");
    if (progress) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
    }
    const backTop = document.querySelector("[data-back-top]");
    if (backTop) backTop.classList.toggle("show", window.scrollY > 600);
  }

  function setupNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle || !nav || !header) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function setupTheme() {
    const stored = localStorage.getItem("riyaa-theme");
    if (stored === "dark") document.body.classList.add("dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.textContent = document.body.classList.contains("dark") ? "Sun" : "Moon";
      button.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const dark = document.body.classList.contains("dark");
        localStorage.setItem("riyaa-theme", dark ? "dark" : "light");
        button.textContent = dark ? "Sun" : "Moon";
      });
    });
  }

  function setupButtons() {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.remove("ripple");
        void button.offsetWidth;
        button.classList.add("ripple");
      });
    });
    document.querySelector("[data-back-top]")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function setupCursor() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  function setupServices() {
    const grid = document.querySelector("[data-services-grid]");
    if (!grid) return;
    const services = [
  {
    name: "Threading",
    image: "images/eyebrow.jpeg"
  },
  {
    name: "Basic to Advance Facials",
    image: "images/Facial.jpeg"
  },
  {
    name: "D-Tan",
    image: "images/D-tan.jpeg"
  },
  {
    name: "Cleanup",
    image: "images/cleanup.jpeg"
  },
  {
    name: "Waxing",
    image: "images/waxing.jpeg"
  },
  {
    name: "Haircut",
    image: "images/hairCUTT.jpeg"
  },
  {
    name: "Hair Spa",
    image: "images/hair spa.jpeg"
  },
  {
    name: "Hair Coloring",
    image: "images/hair color.jpeg"
  },
  {
    name: "Advanced Hair Treatments",
    image: "images/hair treatment.jpeg"
  },
  {
    name: "Pedicure",
    image: "images/pedicure.jpeg"
  },
  {
    name: "Manicure",
    image: "images/nail pedi.jpeg"
  },
  {
    name: "Bridal Makeup",
    image: "images/BRdide.jpeg"
  },
  {
    name: "Engagement Makeup",
    image: "images/enagement.jpeg"
  },
  {
    name: "Reception Makeup",
    image: "images/reception.jpeg"
  },
  {
    name: "Party Makeup",
    image: "images/party.jpeg"
  },
  {
    name: "Baby Shower Makeup",
    image: "images/babyshower.jpeg"
  },
  {
    name: "Indoor Shoot Look",
    image: "images/indoor.jpeg"
  },
  {
    name: "Outdoor Shoot Look",
    image: "images/outdoor.jpeg"
  }
];
    grid.innerHTML = services.map((service, index) => `
      <article class="service-card reveal fade-up">
        <span class="icon">${String(index + 1).padStart(2, "0")}</span>
        <img src="${service.image}" alt="${service.name} service at RIYAA MAKEOVERS" loading="lazy">
        <h3>${service.name}</h3>
        <p>Premium consultation, refined technique, hygienic tools, and a polished finish tailored to you.</p>
        <div class="card-bottom"><span class="price">Price on request</span><button class="btn btn-primary" data-open-booking>Book Now</button></div>
      </article>
    `).join("");
    window.RiyaaAnimations?.refresh();
  }

  function setupFaq() {
    document.querySelectorAll("[data-faq] button").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        panel?.classList.toggle("open");
      });
    });
  }

  function setupSlider() {
    const cards = [...document.querySelectorAll("[data-slider] .review-card")];
    if (!cards.length) return;
    let index = 0;
    const show = (next) => {
      cards[index].classList.remove("active");
      index = (next + cards.length) % cards.length;
      cards[index].classList.add("active");
    };
    document.querySelector("[data-prev]")?.addEventListener("click", () => show(index - 1));
    document.querySelector("[data-next]")?.addEventListener("click", () => show(index + 1));
    setInterval(() => show(index + 1), 5200);
  }

  window.addEventListener("load", () => document.querySelector(".preloader")?.classList.add("loaded"));
  window.addEventListener("scroll", setHeaderState, { passive: true });

  buildHeader();
  buildFooter();
  setupNavigation();
  setupTheme();
  setupButtons();
  setupCursor();
  setupServices();
  setupFaq();
  setupSlider();
  setHeaderState();
})();
