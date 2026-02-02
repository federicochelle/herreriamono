const chips = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll(".gallery-item");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    // UI estado activo
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;

    items.forEach((item) => {
      const cat = item.dataset.category;
      const shouldShow = filter === "all" || cat === filter;

      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.querySelector(".menu-overlay");
const closeTargets = document.querySelectorAll("[data-menu-close]");

if (header && toggle && mobileMenu && overlay) {
  const openMenu = () => {
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    mobileMenu.hidden = false;

    const firstLink = mobileMenu.querySelector("a, button");
    firstLink?.focus();
  };

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    mobileMenu.hidden = true;
    toggle.focus();
  };

  const isOpen = () => header.classList.contains("is-open");

  // Toggle botón hamburguesa
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Click en overlay
  overlay.addEventListener("click", closeMenu);

  // Click en links del menú
  closeTargets.forEach((el) => el.addEventListener("click", closeMenu));

  // ⬅️ CLICK AFUERA REAL
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;

    const clickedInsideMenu =
      mobileMenu.contains(e.target) || toggle.contains(e.target);

    if (!clickedInsideMenu) {
      closeMenu();
    }
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Resize → cierra si pasa a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && isOpen()) closeMenu();
  });
}

// =========================
// MODAL GALERÍA
// =========================

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryModal = document.getElementById("gallery-modal");
const galleryImage = document.getElementById("gallery-modal-image");
const galleryTitle = document.getElementById("gallery-modal-title");
const gallerySpecs = document.getElementById("gallery-modal-specs");
const galleryCTA = document.getElementById("gallery-modal-cta");

if (
  galleryModal &&
  galleryImage &&
  galleryTitle &&
  gallerySpecs &&
  galleryCTA
) {
  const galleryClose = galleryModal.querySelector(".modal-close");
  let lastFocusedEl = null;

  const openGalleryModal = (item) => {
    lastFocusedEl = document.activeElement;

    const img = item.querySelector("img");
    if (!img) return;

    const title = item.dataset.title || img.alt || "este trabajo";

    // Imagen
    galleryImage.src = img.src;
    galleryImage.alt = title;

    // Título
    galleryTitle.textContent = title;

    // Specs
    gallerySpecs.innerHTML = "";
    if (item.dataset.specs) {
      item.dataset.specs.split("|").forEach((spec) => {
        const li = document.createElement("li");
        li.textContent = spec.trim();
        gallerySpecs.appendChild(li);
      });
    }

    // CTA WhatsApp dinámico
    const message = `Hola, quiero pedir un presupuesto para ${title}. `;
    galleryCTA.href = `https://wa.me/59800000000?text=${encodeURIComponent(
      message,
    )}`;

    // Mostrar modal
    galleryModal.classList.add("is-open");

    // Foco accesible
    galleryClose?.focus();
  };

  const closeGalleryModal = () => {
    galleryModal.classList.remove("is-open");
    galleryImage.src = "";
    galleryImage.alt = "";
    galleryCTA.href = "#";

    // Devolver foco
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  };

  // Abrir modal
  galleryItems.forEach((item) => {
    item.tabIndex = 0;
    item.addEventListener("click", () => openGalleryModal(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGalleryModal(item);
      }
    });
  });

  // Cerrar con botón
  galleryClose?.addEventListener("click", closeGalleryModal);

  // Click afuera
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && galleryModal.classList.contains("is-open")) {
      closeGalleryModal();
    }
  });
}

// =========================
// FILTROS GALERÍA
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const gallerySection = document.getElementById("galeria");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Estado activo
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // Scroll suave (solo útil en mobile)
    if (window.innerWidth < 900 && gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }

    // Filtrado
    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.classList.remove("is-hidden");
      } else {
        item.classList.add("is-hidden");
      }
    });
  });
});
