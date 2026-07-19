import { ShopifyPolicyPage } from "../components/ShopifyPolicyPage";

export function RefundPolicy() {
  return (
    <ShopifyPolicyPage
      policyKey="refundPolicy"
      fallbackTitle="Refund Policy"
      fallbackText="Cola aqui o texto real da tua Refund Policy do Shopify — este espaço só tem o estilo pronto, à espera do conteúdo."
    />
  );
}
