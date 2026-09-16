// Animates the cart-drawer's free-shipping progress bar from 0 to its
// target width/position every time the drawer opens (fresh add-to-cart
// render or just reopening via the header cart icon), instead of it
// appearing already filled with no motion. The elements always render
// at their final position server-side, so if this script fails to run
// for any reason the bar still shows correctly, just without the
// animation.
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerEl = document.querySelector('cart-drawer');
  if (!cartDrawerEl) return;

  function resetAndAnimate(el, property) {
    if (!el) return;
    const target = el.dataset.target || '0';
    el.style.transition = 'none';
    el.style[property] = '0%';
    void el.offsetWidth; // force a reflow so the 0% state is committed
    el.style.transition = '';
    el.style[property] = `${target}%`;
  }

  function animateProgress() {
    resetAndAnimate(cartDrawerEl.querySelector('[data-progress-fill]'), 'width');
    resetAndAnimate(cartDrawerEl.querySelector('[data-progress-icon]'), 'left');
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && cartDrawerEl.classList.contains('active')) {
        animateProgress();
      }
    });
  }).observe(cartDrawerEl, { attributes: true });
});
