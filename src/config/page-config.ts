
// This file contains the JSON configuration for our pages

export interface ComponentConfig {
  id: string;
  type: string;
  props?: Record<string, any>;
}

export interface PageConfig {
  page: string;
  title: string;
  components: ComponentConfig[];
}

export const pagesConfig: PageConfig[] = [
  {
    page: "home",
    title: "Home | Dynamic eCommerce",
    components: [
      { id: "hero-banner", type: "banner", props: { variant: "hero", title: "Welcome to our Store", subtitle: "Shop the latest products with amazing deals" } },
      { id: "featured-products", type: "products", props: { variant: "grid", title: "Featured Products", limit: 4 } },
      { id: "promotional-banner", type: "banner", props: { variant: "promo", title: "Summer Sale", subtitle: "Get up to 40% off on selected items" } },
      { id: "main-footer", type: "footer" }
    ]
  },
  {
    page: "shop",
    title: "Shop | Dynamic eCommerce",
    components: [
      { id: "shop-header", type: "banner", props: { variant: "simple", title: "Our Products", subtitle: "Explore our collection" } },
      { id: "shop-layout", type: "products", props: { variant: "list", title: "All Products", limit: 10 } },
      { id: "shop-sidebar", type: "sidebar", props: { categories: ["Clothing", "Electronics", "Home", "Beauty"] } },
      { id: "main-footer", type: "footer" }
    ]
  }
];

// Helper function to get config for a specific page
export function getPageConfig(pageName: string): PageConfig | undefined {
  return pagesConfig.find(config => config.page === pageName);
}
