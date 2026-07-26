import { useEffect, useState } from "react";
import { getShopPolicy, isShopifyConfigured, type PolicyKey } from "../lib/shopify";
import { PolicyPage } from "./PolicyPage";

export function ShopifyPolicyPage({
  policyKey,
  fallbackTitle,
  fallbackText,
}: {
  policyKey: PolicyKey;
  fallbackTitle: string;
  fallbackText: string;
}) {
  const [body, setBody] = useState<string | null>(null);
  const [title, setTitle] = useState(fallbackTitle);
  const [loading, setLoading] = useState(isShopifyConfigured);

  useEffect(() => {
    if (!isShopifyConfigured) return;
    getShopPolicy(policyKey).then((policy) => {
      if (policy) {
        setBody(policy.body);
        setTitle(policy.title);
      }
      setLoading(false);
    });
  }, [policyKey]);

  return (
    <PolicyPage title={title}>
      {loading ? (
        <p className="text-neutral-500">Loading…</p>
      ) : body ? (
        <div dangerouslySetInnerHTML={{ __html: body }} />
      ) : (
        <p className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-amber-200">
          {fallbackText}
        </p>
      )}
    </PolicyPage>
  );
}
