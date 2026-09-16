// Bundles a "Complete the Look" upsell product into the page's main
// Add to Cart request when its checkbox is checked, instead of adding it
// separately. Intercepts the product-form submit in the capture phase
// (before product-form.js's own bubble-phase handler runs) so the whole
// bundle goes to /cart/add.js in a single request, then hands the
// response to the same cart-drawer / cart-notification renderer Dawn
// already uses.
document.addEventListener('DOMContentLoaded', () => {
  const widgets = document.querySelectorAll('[data-complete-look]');
  if (!widgets.length) return;

  const productFormComponent = document.querySelector('product-form');
  const form = productFormComponent && productFormComponent.querySelector('form');
  if (!form) return;

  function getCart() {
    return document.querySelector('cart-notification') || document.querySelector('cart-drawer');
  }

  function getCheckedWidget() {
    for (const widget of widgets) {
      const checkbox = widget.querySelector('[data-complete-look-checkbox]');
      if (checkbox && checkbox.checked) return widget;
    }
    return null;
  }

  document.addEventListener(
    'submit',
    (event) => {
      if (event.target !== form) return;

      const checkedWidget = getCheckedWidget();
      if (!checkedWidget) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      const submitButton = form.querySelector('[type="submit"]');
      const spinner = form.querySelector('.loading__spinner');
      if (submitButton) {
        submitButton.setAttribute('aria-disabled', 'true');
        submitButton.classList.add('loading');
      }
      if (spinner) spinner.classList.remove('hidden');

      const formData = new FormData(form);
      const mainVariantId = formData.get('id');
      const quantity = parseInt(formData.get('quantity'), 10) || 1;
      const lookVariantId = checkedWidget.dataset.variantId;

      const cart = getCart();
      const body = {
        items: [
          { id: mainVariantId, quantity },
          { id: lookVariantId, quantity: 1 },
        ],
      };
      if (cart) {
        body.sections = cart.getSectionsToRender().map((section) => section.id);
        body.sections_url = window.location.pathname;
        if (cart.setActiveElement) cart.setActiveElement(document.activeElement);
      }

      fetch(window.routes.cart_add_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            console.error(response.description || response.message);
            return;
          }
          if (cart) {
            cart.renderContents(response);
          } else {
            window.location = window.routes.cart_url;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          if (submitButton) {
            submitButton.classList.remove('loading');
            submitButton.removeAttribute('aria-disabled');
          }
          if (spinner) spinner.classList.add('hidden');
        });
    },
    true
  );
});
