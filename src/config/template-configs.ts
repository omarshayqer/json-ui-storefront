
import { PageConfig } from './page-config';

// Template A - Standard eCommerce Layout
export const templateAConfig: PageConfig[] = [
  {
    page: "home",
    title: "Home | Standard eCommerce",
    components: [
      { id: "hero-banner", type: "banner", props: { variant: "hero", title: "Welcome to our Store", subtitle: "Shop the latest products with amazing deals" } },
      { id: "featured-products", type: "products", props: { variant: "grid", displayVariant: "standard", title: "Featured Products", limit: 4 } },
      { id: "promotional-banner", type: "banner", props: { variant: "promo", title: "Summer Sale", subtitle: "Get up to 40% off on selected items" } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "shop",
    title: "Shop | Standard eCommerce",
    components: [
      { id: "shop-header", type: "banner", props: { variant: "simple", title: "Our Products", subtitle: "Explore our collection" } },
      { id: "shop-layout", type: "products", props: { variant: "grid", displayVariant: "standard", title: "All Products", limit: 8 } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "about",
    title: "About Us | Standard eCommerce",
    components: [
      { id: "about-header", type: "banner", props: { variant: "simple", title: "About Our Store", subtitle: "Learn more about our journey" } },
      { id: "about-content", type: "aboutContent", props: { layout: "standard" } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "cart",
    title: "Your Cart | Standard eCommerce",
    components: [
      { id: "cart-header", type: "banner", props: { variant: "simple", title: "Your Shopping Cart", subtitle: "Review and checkout" } },
      { id: "cart-content", type: "cartContent", props: { layout: "standard" } },
      { id: "main-footer", type: "footer" }
    ]
  }
];

// Template B - Premium eCommerce Layout
export const templateBConfig: PageConfig[] = [
  {
    page: "home",
    title: "Home | Premium eCommerce",
    components: [
      { id: "hero-banner", type: "banner", props: { variant: "hero", title: "Exclusive Collections", subtitle: "Discover our premium selection" } },
      { id: "featured-products", type: "products", props: { variant: "grid", displayVariant: "detailed", title: "Featured Items", limit: 3 } },
      { id: "promotional-banner", type: "banner", props: { variant: "promo", title: "Limited Edition", subtitle: "Shop our exclusive items before they're gone" } },
      { id: "quick-products", type: "products", props: { variant: "grid", displayVariant: "minimal", title: "Bestsellers", limit: 6 } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "shop",
    title: "Shop | Premium eCommerce",
    components: [
      { id: "shop-header", type: "banner", props: { variant: "simple", title: "Our Collection", subtitle: "Premium quality products" } },
      { id: "shop-sidebar", type: "sidebar", props: { categories: ["Luxury", "Designer", "Limited Edition", "Seasonal"] } },
      { id: "shop-layout", type: "products", props: { variant: "list", displayVariant: "detailed", title: "Premium Selection", limit: 5 } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "about",
    title: "About Us | Premium eCommerce",
    components: [
      { id: "about-header", type: "banner", props: { variant: "hero", title: "Our Premium Brand", subtitle: "Craftsmanship and excellence since 2010" } },
      { id: "about-content", type: "aboutContent", props: { layout: "premium" } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "cart",
    title: "Your Cart | Premium eCommerce",
    components: [
      { id: "cart-header", type: "banner", props: { variant: "simple", title: "Your Selections", subtitle: "Review your premium items" } },
      { id: "cart-content", type: "cartContent", props: { layout: "premium" } },
      { id: "main-footer", type: "footer" }
    ]
  }
];

// Template C - Minimal eCommerce Layout
export const templateCConfig: PageConfig[] = [
  {
    page: "home",
    title: "Home | Minimal eCommerce",
    components: [
      { id: "simple-banner", type: "banner", props: { variant: "simple", title: "Minimal Store", subtitle: "Less is more" } },
      { id: "minimal-products", type: "products", props: { variant: "grid", displayVariant: "minimal", title: "Shop", limit: 12 } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "shop",
    title: "Shop | Minimal eCommerce",
    components: [
      { id: "shop-layout", type: "products", props: { variant: "grid", displayVariant: "minimal", limit: 24 } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "about",
    title: "About | Minimal eCommerce",
    components: [
      { id: "about-content", type: "aboutContent", props: { layout: "minimal" } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "cart",
    title: "Cart | Minimal eCommerce",
    components: [
      { id: "cart-content", type: "cartContent", props: { layout: "minimal" } },
      { id: "main-footer", type: "footer" }
    ]
  }
];

// Function to select a template config based on template name
export function getTemplateConfig(templateName: string = 'standard'): PageConfig[] {
  switch (templateName.toLowerCase()) {
    case 'premium':
      return templateBConfig;
    case 'minimal':
      return templateCConfig;
    case 'standard':
    default:
      return templateAConfig;
  }
}
