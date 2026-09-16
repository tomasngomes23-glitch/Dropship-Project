// Animates the cart-drawer's free-shipping progress bar from 0 to its
// target width/position every time the drawer opens (fresh add-to-cart
// render or just reopening via the header cart icon), instead of it
// appearing already filled with no motion.
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerEl = document.querySelector('cart-drawer');
  if (!cartDrawerEl) return;

  function animateProgress() {
    const fill = cartDrawerEl.querySelector('[data-progress-fill]');
    const icon = cartDrawerEl.querySelector('[data-progress-icon]');
    if (!fill && !icon) return;

    if (fill) fill.style.width = '0%';
    if (icon) icon.style.left = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fill) fill.style.width = `${fill.dataset.target || 0}%`;
        if (icon) icon.style.left = `${icon.dataset.target || 0}%`;
      });
    });
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && cartDrawerEl.classList.contains('active')) {
        animateProgress();
      }
    });
  }).observe(cartDrawerEl, { attributes: true });
});
