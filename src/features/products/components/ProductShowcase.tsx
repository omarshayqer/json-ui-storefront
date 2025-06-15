
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductShowcaseProps {
  variant?: 'hero' | 'featured' | 'trending' | 'carousel' | 'banner';
  title?: string;
  subtitle?: string;
  limit?: number;
  category?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function ProductShowcase({ 
  variant = 'featured',
  title = "Featured Products", 
  subtitle,
  limit = 4, 
  category,
  showCta = true,
  ctaText = "View All Products",
  ctaLink = "/shop"
}: ProductShowcaseProps) {
  const { products, loading, error } = useProducts({ limit, category });

  if (error || loading) {
    return null;
  }

  if (variant === 'hero' && products.length > 0) {
    const heroProduct = products[0];
    return (
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="fade-right">
              <div>
                <Badge className="mb-4 bg-brand text-white">Featured Product</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">{heroProduct.name}</h1>
                <p className="text-xl mb-8 text-gray-300">{heroProduct.description}</p>
                <div className="flex items-center mb-8">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(heroProduct.rating.rate) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-gray-300">({heroProduct.rating.count} reviews)</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-bold">${heroProduct.price.toFixed(2)}</span>
                  <Badge variant="outline" className="text-white border-white">{heroProduct.category}</Badge>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-brand hover:bg-brand-dark">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade-left">
              <div className="relative">
                <img 
                  src={heroProduct.image} 
                  alt={heroProduct.name}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'banner') {
    return (
      <section className="bg-brand text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-brand-light">{subtitle}</p>}
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <AnimatedElement key={product.id} animation="fade-up" delay={index * 100}>
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <CardContent className="p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                    <h3 className="font-semibold mb-2 text-white">{product.name}</h3>
                    <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
          
          {showCta && (
            <AnimatedElement animation="fade-up" delay={400} className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </AnimatedElement>
          )}
        </div>
      </section>
    );
  }

  if (variant === 'trending') {
    return (
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up" className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500 text-white">🔥 Trending Now</Badge>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <AnimatedElement key={product.id} animation="zoom-in" delay={index * 100}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      #{index + 1}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(Math.floor(product.rating.rate))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
          
          {showCta && (
            <AnimatedElement animation="fade-up" delay={400} className="text-center mt-12">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            </AnimatedElement>
          )}
        </div>
      </section>
    );
  }

  // Default featured variant
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </AnimatedElement>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <AnimatedElement key={product.id} animation="fade-up" delay={index * 100}>
              <ProductCard product={product} variant="grid" displayVariant="standard" />
            </AnimatedElement>
          ))}
        </div>
        
        {showCta && (
          <AnimatedElement animation="fade-up" delay={400} className="text-center mt-12">
            <Button asChild size="lg">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}
