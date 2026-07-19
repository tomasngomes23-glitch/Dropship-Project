import { ShopifyPolicyPage } from "../components/ShopifyPolicyPage";

export function ShippingPolicy() {
  return (
    <ShopifyPolicyPage
      policyKey="shippingPolicy"
      fallbackTitle="Shipping Policy"
      fallbackText="Cola aqui o texto real da tua Shipping Policy do Shopify — este espaço só tem o estilo pronto, à espera do conteúdo."
    />
  );
}
