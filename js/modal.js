document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const line1 = document.getElementById("modalLine1");
  const line2 = document.getElementById("modalLine2");
  const line3 = document.getElementById("modalLine3");

  function openModal(item) {
    const img = item.querySelector("img");

    modalImg.src = img.src; // usa la misma imagen clickeada
    modalImg.alt = img.alt;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.hidden = true;
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => openModal(item));
  });

  modal.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
});
