import { ShopifyPolicyPage } from "../components/ShopifyPolicyPage";

export function TermsOfService() {
  return (
    <ShopifyPolicyPage
      policyKey="termsOfService"
      fallbackTitle="Terms of Service"
      fallbackText="Cola aqui o texto real dos teus Terms of Service do Shopify — este espaço só tem o estilo pronto, à espera do conteúdo."
    />
  );
}
