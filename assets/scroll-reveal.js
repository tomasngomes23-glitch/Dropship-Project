(function () {
  var VISIBLE_CLASS = 'scroll-reveal--visible';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup() {
    var sections = document.querySelectorAll('main .shopify-section, main .shopify-section-group-template-groups');

    if (!sections.length || reduceMotion) return;

    if (!('IntersectionObserver' in window)) {
      sections.forEach(function (section) {
        section.classList.add(VISIBLE_CLASS);
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    sections.forEach(function (section) {
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
