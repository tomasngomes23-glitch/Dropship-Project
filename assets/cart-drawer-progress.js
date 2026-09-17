// Animates the cart-drawer's free-shipping progress bar from 0 to its
// target width every time the drawer opens. The bar's true target width
// is always rendered server-side first (so it looks correct even if this
// script fails to run). The icon marker is a child of the fill bar itself
// (positioned at its right edge via CSS), so it always tracks the fill's
// width automatically with no separate syncing logic needed.
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerEl = document.querySelector('cart-drawer');
  if (!cartDrawerEl) return;

  function animateProgress() {
    const fill = cartDrawerEl.querySelector('[data-progress-fill]');
    if (!fill) return;
    const target = fill.dataset.target || '0';

    fill.style.transition = 'none';
    fill.style.width = '0%';
    fill.getBoundingClientRect();
    fill.style.transition = '';
    requestAnimationFrame(() => {
      fill.style.width = `${target}%`;
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
