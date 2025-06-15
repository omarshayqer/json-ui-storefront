
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { AnimatedElement } from '@/components/ui/animated-element';

interface ProductGridProps {
  variant?: 'compact' | 'standard' | 'spacious' | 'masonry';
  displayVariant?: 'minimal' | 'standard' | 'detailed' | 'card' | 'tile';
  title?: string;
  limit?: number;
  category?: string;
  showFilters?: boolean;
}

export default function ProductGrid({ 
  variant = 'standard', 
  displayVariant = 'standard',
  title, 
  limit, 
  category,
  showFilters = false
}: ProductGridProps) {
  const { products, loading, error } = useProducts({ limit, category });

  if (error) {
    return (
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error Loading Products</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  const getGridClasses = () => {
    switch (variant) {
      case 'compact':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3';
      case 'spacious':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'masonry':
        return 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    }
  };

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {title && (
        <AnimatedElement animation="fade-up">
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        </AnimatedElement>
      )}
      
      {loading ? (
        <div className={`grid ${getGridClasses()}`}>
          {[...Array(limit || 8)].map((_, index) => (
            <div key={index} className="animate-pulse h-80 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className={variant === 'masonry' ? getGridClasses() : `grid ${getGridClasses()}`}>
          {products.map((product, index) => (
            <AnimatedElement key={product.id} animation="fade-up" delay={index * 50}>
              {variant === 'masonry' ? (
                <div className="break-inside-avoid">
                  <ProductCard 
                    product={product} 
                    variant="grid" 
                    displayVariant={displayVariant}
                  />
                </div>
              ) : (
                <ProductCard 
                  product={product} 
                  variant="grid" 
                  displayVariant={displayVariant}
                />
              )}
            </AnimatedElement>
          ))}
        </div>
      )}
    </section>
  );
}
