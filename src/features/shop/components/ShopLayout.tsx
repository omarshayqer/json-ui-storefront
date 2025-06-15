
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AnimatedElement } from '@/components/ui/animated-element';
import Products from '@/features/products/components/Products';
import ProductGrid from '@/features/products/components/ProductGrid';

interface ShopLayoutProps {
  variant?: 'sidebar' | 'top-filters' | 'minimal' | 'advanced';
  showFilters?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
  showViewToggle?: boolean;
}

export default function ShopLayout({
  variant = 'sidebar',
  showFilters = true,
  showSearch = true,
  showSort = true,
  showViewToggle = true
}: ShopLayoutProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Products',
    'Electronics',
    'Clothing',
    'Home',
    'Beauty',
    'Sports'
  ];

  const FilterSection = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Filters</h3>
        
        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category === 'All Products' ? '' : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="flex gap-2">
            <Input placeholder="Min" type="number" />
            <Input placeholder="Max" type="number" />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>{rating}+ stars</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TopControls = () => (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        )}
        
        {showFilters && variant === 'top-filters' && (
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSort && (
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        )}

        {showViewToggle && (
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className="container mx-auto py-8 px-4">
        <AnimatedElement animation="fade-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium products
            </p>
          </div>
          
          {showSearch && (
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-center"
                />
              </div>
            </div>
          )}
        </AnimatedElement>

        <ProductGrid variant="standard" displayVariant="card" category={selectedCategory} />
      </div>
    );
  }

  if (variant === 'top-filters') {
    return (
      <div className="container mx-auto py-8 px-4">
        <AnimatedElement animation="fade-up">
          <h1 className="text-3xl font-bold mb-8">Shop</h1>
          <TopControls />
        </AnimatedElement>

        <Products variant={viewMode} displayVariant="standard" category={selectedCategory} />
      </div>
    );
  }

  if (variant === 'advanced') {
    return (
      <div className="container mx-auto py-8 px-4">
        <AnimatedElement animation="fade-up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Shop</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Home</span>
              <span>/</span>
              <span>Shop</span>
              {selectedCategory && (
                <>
                  <span>/</span>
                  <span>{selectedCategory}</span>
                </>
              )}
            </div>
          </div>

          <TopControls />
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="outline" className="cursor-pointer">Free Shipping</Badge>
            <Badge variant="outline" className="cursor-pointer">On Sale</Badge>
            <Badge variant="outline" className="cursor-pointer">In Stock</Badge>
            <Badge variant="outline" className="cursor-pointer">New Arrivals</Badge>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AnimatedElement animation="fade-right">
              <FilterSection />
            </AnimatedElement>
          </div>
          <div className="lg:col-span-3">
            <AnimatedElement animation="fade-left">
              <Products variant={viewMode} displayVariant="standard" category={selectedCategory} />
            </AnimatedElement>
          </div>
        </div>
      </div>
    );
  }

  // Default sidebar variant
  return (
    <div className="container mx-auto py-8 px-4">
      <AnimatedElement animation="fade-up">
        <h1 className="text-3xl font-bold mb-8">Shop</h1>
        <TopControls />
      </AnimatedElement>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {showFilters && (
          <div className="lg:col-span-1">
            <AnimatedElement animation="fade-right">
              <FilterSection />
            </AnimatedElement>
          </div>
        )}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          <AnimatedElement animation="fade-left">
            <Products variant={viewMode} displayVariant="standard" category={selectedCategory} />
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
}
