(function () {
  const modal = document.querySelector("[data-booking-modal]");
  const toast = document.querySelector("[data-toast]");

  function openModal() {
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
  }

  function showToast() {
    if (!toast) return;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-open-booking]")) openModal();
    if (event.target.matches("[data-close-booking]")) closeModal();
    if (event.target === modal) closeModal();
  });

  document.querySelectorAll("[data-appointment-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      closeModal();
      showToast();
    });
  });
})();
