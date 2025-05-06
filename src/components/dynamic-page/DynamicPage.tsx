
import { getPageConfig, PageConfig } from '@/config/page-config';
import { renderComponent } from '@/lib/component-registry';
import Header from '@/components/layout/Header';
import TemplateSelector from '@/components/template-selector/TemplateSelector';
import { useEffect } from 'react';

interface DynamicPageProps {
  pageName: string;
  productId?: string;
}

export default function DynamicPage({ pageName, productId }: DynamicPageProps) {
  const pageConfig = getPageConfig(pageName);

  useEffect(() => {
    if (pageConfig) {
      document.title = pageConfig.title || 'Dynamic eCommerce';
    }
  }, [pageConfig]);

  // Helper function to render a component with additional props
  const renderWithProps = (component: any) => {
    const props = component.props || {};
    // Add productId to components that might need it
    if (productId && (component.type === 'productDetail')) {
      return renderComponent({ ...component, props: { ...props, productId } });
    }
    return renderComponent(component);
  };

  if (!pageConfig) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500">Page Not Found</h1>
            <p className="mt-4 text-gray-600">The page configuration for "{pageName}" could not be found.</p>
          </div>
        </div>
        <TemplateSelector />
      </div>
    );
  }

  // Handle special page layouts like shop page with sidebar
  if (pageName === 'shop') {
    // Find sidebar component
    const sidebarComponent = pageConfig.components.find(comp => comp.type === 'sidebar');
    
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        {pageConfig.components.find(comp => comp.type === 'banner') && 
          renderComponent(pageConfig.components.find(comp => comp.type === 'banner')!)
        }
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              {sidebarComponent && renderComponent(sidebarComponent)}
            </div>
            <div className="md:w-3/4">
              {pageConfig.components
                .filter(comp => comp.type !== 'sidebar' && comp.type !== 'banner' && comp.type !== 'footer')
                .map(renderWithProps)}
            </div>
          </div>
        </div>
        {pageConfig.components.find(comp => comp.type === 'footer') && 
          renderComponent(pageConfig.components.find(comp => comp.type === 'footer')!)
        }
        <TemplateSelector />
      </div>
    );
  }

  // Standard page layout
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {pageConfig.components.map(renderWithProps)}
      <TemplateSelector />
    </div>
  );
}
