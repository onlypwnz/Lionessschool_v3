(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!header || !toggle || !menu) return;

  const setScrolled = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    document.body.classList.remove("is-menu-open");
  };

  const openMenu = () => {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
    document.body.classList.add("is-menu-open");
  };

  toggle.addEventListener("click", () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && !menu.hidden) closeMenu();
  });

  window.addEventListener("scroll", setScrolled, { passive: true });
  setScrolled();
})();

// Фильтр образовательных программ; работает без сетевых запросов.
(function () {
  const buttons = document.querySelectorAll('[data-course-filter]');
  const cards = document.querySelectorAll('[data-course-category]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.courseFilter;
      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((card) => {
        card.hidden = selected !== 'all' && card.dataset.courseCategory !== selected;
      });
    });
  });
})();
