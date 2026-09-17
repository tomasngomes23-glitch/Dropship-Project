// Animates the cart-drawer's free-shipping progress bar from 0 to its
// target width/position every time the drawer opens (fresh add-to-cart
// render or just reopening via the header cart icon). The bar's true
// target position is always rendered server-side first (so it looks
// correct even if this script fails to run); the animation explicitly
// locks to that same target on finish so it never gets stuck mid-way
// if a new render interrupts it.
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawerEl = document.querySelector('cart-drawer');
  if (!cartDrawerEl) return;

  function animateBar(el, property) {
    if (!el) return;
    const target = el.dataset.target || '0';

    el.getAnimations().forEach((animation) => animation.cancel());

    const animation = el.animate(
      [{ [property]: '0%' }, { [property]: `${target}%` }],
      { duration: 700, easing: 'ease-out', fill: 'forwards' }
    );

    animation.onfinish = () => {
      animation.cancel();
      el.style[property] = `${target}%`;
    };
  }

  function animateProgress() {
    animateBar(cartDrawerEl.querySelector('[data-progress-fill]'), 'width');
    animateBar(cartDrawerEl.querySelector('[data-progress-icon]'), 'left');
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && cartDrawerEl.classList.contains('active')) {
        animateProgress();
      }
    });
  }).observe(cartDrawerEl, { attributes: true });
});
