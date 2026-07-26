import { ShopifyPolicyPage } from "../components/ShopifyPolicyPage";

export function PrivacyPolicy() {
  return (
    <ShopifyPolicyPage
      policyKey="privacyPolicy"
      fallbackTitle="Privacy Policy"
      fallbackText="Cola aqui o texto real da tua Privacy Policy do Shopify — este espaço só tem o estilo pronto, à espera do conteúdo."
    />
  );
}
