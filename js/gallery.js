(function () {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const items = [
  ["bridal", "images/Brdide.jpeg"],
  ["hair", "images/hairCUTT.jpeg"],
  ["facial", "images/Facial.jpeg"],
  ["bridal", "images/Brdide copy.jpeg"],
  ["bridal", "images/enagement.jpeg"],
  ["hair", "images/hair color.jpeg"],
  ["facial", "images/cleanup.jpeg"],
  ["hair", "images/hair spa.jpeg"],
  ["events", "images/party.jpeg"],
  ["academy", "images/indoor.jpeg"]
];

  gallery.innerHTML = items.map(([category, src]) => `
    <button class="gallery-item reveal fade-up" data-category="${category}" data-src="${src}">
      <img src="${src}" alt="${category} gallery image from RIYAA MAKEOVERS" loading="lazy">
    </button>
  `).join("");

  const lightbox = document.querySelector("[data-lightbox]");
  const preview = lightbox?.querySelector("img");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!lightbox || !preview) return;
      preview.src = item.dataset.src;
      preview.alt = item.querySelector("img")?.alt || "Gallery preview";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  document.querySelector("[data-lightbox-close]")?.addEventListener("click", () => {
    lightbox?.classList.remove("open");
    lightbox?.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  window.RiyaaAnimations?.refresh();
})();
