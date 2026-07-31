(function () {
  function getPersonalizationValue(scope) {
    var fieldsets = scope.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      var legend = fieldsets[i].querySelector('legend');
      if (legend && legend.textContent.trim().toLowerCase().indexOf('personalization') === 0) {
        var checked = fieldsets[i].querySelector('input:checked');
        return checked ? checked.value : null;
      }
    }
    return null;
  }

  function updateFields(container) {
    var wrapper = container.querySelector('[data-personalization-fields]');
    if (!wrapper) return;

    var value = getPersonalizationValue(container);
    var isAdding = !!value && value.toLowerCase().indexOf('add name') === 0;
    var inputs = wrapper.querySelectorAll('input');

    wrapper.hidden = !isAdding;
    inputs.forEach(function (input) {
      input.disabled = !isAdding;
      input.required = isAdding;
      if (!isAdding) input.value = '';
    });
  }

  function init() {
    document.querySelectorAll('.product__info-container').forEach(function (container) {
      updateFields(container);
      container.addEventListener('change', function () {
        updateFields(container);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
