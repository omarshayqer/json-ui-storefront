
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  variant?: 'grid' | 'list';
  title?: string;
  limit?: number;
  category?: string;
}

export default function Products({ variant = 'grid', title, limit, category }: ProductsProps) {
  const { products, loading, error } = useProducts({ limit, category });

  if (error) {
    return (
      <div className="my-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error Loading Products</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {title && (
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit || 4)].map((_, index) => (
            <div key={index} className="animate-pulse h-80 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        variant === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant="list" />
            ))}
          </div>
        )
      )}
    </section>
  );
}
