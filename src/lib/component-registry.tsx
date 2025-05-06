
import React, { lazy, Suspense } from 'react';
import { ComponentConfig } from '@/config/page-config';

// Dynamic imports for our components
const Banner = lazy(() => import('@/features/banner/components/Banner'));
const Products = lazy(() => import('@/features/products/components/Products'));
const Footer = lazy(() => import('@/features/footer/components/Footer'));
const Sidebar = lazy(() => import('@/features/sidebar/components/Sidebar'));
const AboutContent = lazy(() => import('@/features/about/components/AboutContent'));
const CartContent = lazy(() => import('@/features/cart/components/CartContent'));

// Component registry mapping
const componentRegistry: Record<string, React.ComponentType<any>> = {
  'banner': Banner,
  'products': Products,
  'footer': Footer,
  'sidebar': Sidebar,
  'aboutContent': AboutContent,
  'cartContent': CartContent,
};

// Loading fallback
const ComponentLoader = () => (
  <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-md animate-pulse">
    <div className="text-gray-400">Loading component...</div>
  </div>
);

// Component renderer function
export function renderComponent(config: ComponentConfig) {
  const Component = componentRegistry[config.type];
  
  if (!Component) {
    console.error(`Component type "${config.type}" not found in registry`);
    return <div className="text-red-500">Component not found: {config.type}</div>;
  }

  return (
    <Suspense key={config.id} fallback={<ComponentLoader />}>
      <Component {...(config.props || {})} />
    </Suspense>
  );
}
