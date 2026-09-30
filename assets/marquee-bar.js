// Keeps the header marquee ticker looping seamlessly on any screen width.
// The section renders 4 copies of the message list as a no-JS fallback, but
// on very wide screens (or with few/short messages) that can still run out
// before it loops. This measures one copy's real pixel width and clones it
// until there's always at least two viewports' worth of content, then tells
// the CSS animation to slide by exactly that width via --marquee-shift.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-marquee-track]').forEach((track) => {
    const viewport = track.parentElement;
    const originalSet = track.querySelector('.marquee-bar__set');
    if (!viewport || !originalSet) return;

    const setHTML = originalSet.outerHTML;

    function ensureCoverage() {
      const setWidth = originalSet.getBoundingClientRect().width;
      if (!setWidth) return;

      const viewportWidth = viewport.getBoundingClientRect().width;
      const minSets = Math.ceil((viewportWidth * 2) / setWidth) + 1;

      while (track.children.length < minSets) {
        track.insertAdjacentHTML('beforeend', setHTML);
      }

      Array.from(track.children).forEach((set, index) => {
        if (index > 0) set.setAttribute('aria-hidden', 'true');
      });

      track.style.setProperty('--marquee-shift', `${setWidth}px`);
    }

    ensureCoverage();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(ensureCoverage, 200);
    });
  });
});
