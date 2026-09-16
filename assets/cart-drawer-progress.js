// Animates the cart-drawer's free-shipping progress bar from 0 to its
// target width/position every time the drawer opens (fresh add-to-cart
// render or just reopening via the header cart icon). Uses the Web
// Animations API instead of toggling inline styles/transitions, since
// the bar's true target position is always rendered server-side first
// (so it looks correct even if this script fails to run) and .animate()
// reverts to that underlying value when the animation finishes, with
// no reflow-timing tricks required.
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerEl = document.querySelector('cart-drawer');
  if (!cartDrawerEl) return;

  function animateProgress() {
    const fill = cartDrawerEl.querySelector('[data-progress-fill]');
    if (fill) {
      const target = fill.dataset.target || '0';
      fill.animate([{ width: '0%' }, { width: `${target}%` }], { duration: 700, easing: 'ease-out' });
    }

    const icon = cartDrawerEl.querySelector('[data-progress-icon]');
    if (icon) {
      const target = icon.dataset.target || '0';
      icon.animate([{ left: '0%' }, { left: `${target}%` }], { duration: 700, easing: 'ease-out' });
    }
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && cartDrawerEl.classList.contains('active')) {
        animateProgress();
      }
    });
  }).observe(cartDrawerEl, { attributes: true });
});
