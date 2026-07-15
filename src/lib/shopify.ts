import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN as string | undefined;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined;

export const isShopifyConfigured = Boolean(domain && token);

export const shopifyClient = isShopifyConfigured
  ? createStorefrontApiClient({
      storeDomain: `https://${domain}`,
      apiVersion: "2025-01",
      publicAccessToken: token as string,
    })
  : null;

export interface ShopifyVariant {
  id: string;
  title: string;
  quantityAvailable: number | null;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  images: { url: string; altText: string | null }[];
  variants: ShopifyVariant[];
}

const PRODUCT_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      images(first: 10) {
        nodes { url altText }
      }
      variants(first: 10) {
        nodes {
          id
          title
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!shopifyClient) return null;
  const { data } = await shopifyClient.request(PRODUCT_QUERY, { variables: { handle } });
  const product = data?.product;
  if (!product) return null;
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    images: product.images.nodes,
    variants: product.variants.nodes,
  };
}

const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl totalQuantity cost { totalAmount { amount currencyCode } } }
      userErrors { field message }
    }
  }
`;

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  totalAmount: { amount: string; currencyCode: string };
}

export async function createCart(variantId: string, quantity: number): Promise<ShopifyCart | null> {
  if (!shopifyClient) return null;
  const { data } = await shopifyClient.request(CART_CREATE_MUTATION, {
    variables: { lines: [{ merchandiseId: variantId, quantity }] },
  });
  const cart = data?.cartCreate?.cart;
  if (!cart) return null;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    totalAmount: cart.cost.totalAmount,
  };
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCart | null> {
  if (!shopifyClient) return null;
  const { data } = await shopifyClient.request(CART_LINES_UPDATE_MUTATION, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  const cart = data?.cartLinesUpdate?.cart;
  if (!cart) return null;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    totalAmount: cart.cost.totalAmount,
  };
}
