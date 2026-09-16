// Animates the open/close of every ".accordion details" (FAQ, product
// details tabs, disclosures) instead of letting the content snap in.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion > details, .accordion details').forEach((details) => {
    if (details.dataset.accordionAnimated) return;
    details.dataset.accordionAnimated = 'true';

    const summary = details.querySelector('summary');
    const content = details.querySelector('.accordion__content');
    if (!summary || !content) return;

    let animation = null;
    let isClosing = false;
    let isExpanding = false;

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      details.style.overflow = 'hidden';

      if (isClosing || !details.open) {
        open();
      } else if (isExpanding || details.open) {
        shrink();
      }
    });

    function shrink() {
      isClosing = true;
      const startHeight = `${details.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight}px`;

      if (animation) animation.cancel();
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 300, easing: 'ease-out' }
      );
      content.animate({ opacity: [1, 0] }, { duration: 150, easing: 'ease-out' });
      animation.onfinish = () => onAnimationFinish(false);
      animation.oncancel = () => (isClosing = false);
    }

    function open() {
      details.style.height = `${details.offsetHeight}px`;
      details.open = true;
      window.requestAnimationFrame(() => expand());
    }

    function expand() {
      isExpanding = true;
      const startHeight = `${details.offsetHeight}px`;
      const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

      if (animation) animation.cancel();
      animation = details.animate(
        { height: [startHeight, endHeight] },
        { duration: 300, easing: 'ease-out' }
      );
      content.animate({ opacity: [0, 1] }, { duration: 300, delay: 60, easing: 'ease-in', fill: 'backwards' });
      animation.onfinish = () => onAnimationFinish(true);
      animation.oncancel = () => (isExpanding = false);
    }

    function onAnimationFinish(open) {
      details.open = open;
      animation = null;
      isClosing = false;
      isExpanding = false;
      details.style.height = '';
      details.style.overflow = '';
    }
  });
});
