
import React, { lazy, Suspense } from 'react';
import { ComponentConfig } from '@/config/page-config';

// Dynamic imports for our components
const Banner = lazy(() => import('@/features/banner/components/Banner'));
const Products = lazy(() => import('@/features/products/components/Products'));
const Footer = lazy(() => import('@/features/footer/components/Footer'));
const Sidebar = lazy(() => import('@/features/sidebar/components/Sidebar'));
const AboutContent = lazy(() => import('@/features/about/components/AboutContent'));
const CartContent = lazy(() => import('@/features/cart/components/CartContent'));
const CheckoutContent = lazy(() => import('@/features/checkout/components/CheckoutContent'));
const ProductDetail = lazy(() => import('@/features/products/components/ProductDetail'));
const OrdersContent = lazy(() => import('@/features/orders/components/OrdersContent'));
const FeaturedProducts = lazy(() => import('@/features/carousel/components/FeaturedProducts'));
const ProductCollection = lazy(() => import('@/features/collections/components/ProductCollection'));
const StoreLocation = lazy(() => import('@/features/store-location/components/StoreLocation'));
const Testimonials = lazy(() => import('@/features/testimonials/components/Testimonials'));
const SupportButton = lazy(() => import('@/features/support/components/SupportButton'));
const MiniCart = lazy(() => import('@/features/cart/components/MiniCart'));
const ElectronicsShowcase = lazy(() => import('@/features/electronics/components/ElectronicsShowcase'));
const SpecsComparison = lazy(() => import('@/features/electronics/components/SpecsComparison'));

// Component registry mapping
const componentRegistry: Record<string, React.ComponentType<any>> = {
  'banner': Banner,
  'products': Products,
  'footer': Footer,
  'sidebar': Sidebar,
  'aboutContent': AboutContent,
  'cartContent': CartContent,
  'checkoutContent': CheckoutContent,
  'productDetail': ProductDetail,
  'ordersContent': OrdersContent,
  'featuredProducts': FeaturedProducts,
  'productCollection': ProductCollection,
  'storeLocation': StoreLocation,
  'testimonials': Testimonials,
  'supportButton': SupportButton,
  'miniCart': MiniCart,
  'electronicsShowcase': ElectronicsShowcase,
  'specsComparison': SpecsComparison
};

// Loading fallback
const ComponentLoader = () => (
  <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-md animate-pulse">
    <div className="text-gray-400">Loading component...</div>
  </div>
);

// Component renderer function
export function renderComponent(component: any) {
  const Component = componentRegistry[component.type];
  
  if (!Component) {
    console.error(`Component type "${component.type}" not found in registry`);
    return <div className="text-red-500">Component not found: {component.type}</div>;
  }

  switch (component.type) {
    case 'ordersContent':
      return <OrdersContent key={component.id} {...component.props} />;
    case 'supportButton':
    case 'miniCart':
      // These components should render directly without Suspense
      return <Component key={component.id} {...(component.props || {})} />;
    default:
      return (
        <Suspense key={component.id} fallback={<ComponentLoader />}>
          <Component {...(component.props || {})} />
        </Suspense>
      );
  }
}
