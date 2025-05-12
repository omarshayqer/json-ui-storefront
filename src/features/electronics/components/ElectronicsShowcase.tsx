
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Laptop, Smartphone, Headphones, Battery } from 'lucide-react';
import { useState } from 'react';
import { useStyleConfig } from '@/hooks/useStyleConfig';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ElectronicsShowcaseProps {
  title?: string;
  variant?: 'grid' | 'list';
  style?: any;
}

interface ElectronicProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  specs: Record<string, string>;
  image: string;
  icon: React.ReactNode;
  discount?: number;
  isNew?: boolean;
}

export default function ElectronicsShowcase({
  title = "Featured Electronics",
  variant = 'grid',
  style
}: ElectronicsShowcaseProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const styleProps = useStyleConfig(style);
  
  const products: ElectronicProduct[] = [
    {
      id: 'laptop-1',
      name: 'UltraBook Pro',
      category: 'laptops',
      price: 1299,
      specs: {
        cpu: 'Intel i7-12700H',
        ram: '16GB DDR5',
        storage: '512GB NVMe SSD',
        display: '15.6" 4K OLED'
      },
      image: '/placeholder.svg',
      icon: <Laptop className="h-5 w-5" />,
      isNew: true
    },
    {
      id: 'smartphone-1',
      name: 'Galaxy Ultra',
      category: 'smartphones',
      price: 999,
      specs: {
        cpu: 'Snapdragon 8 Gen 2',
        ram: '12GB',
        storage: '256GB',
        display: '6.8" AMOLED 120Hz'
      },
      image: '/placeholder.svg',
      icon: <Smartphone className="h-5 w-5" />,
      discount: 10
    },
    {
      id: 'headphones-1',
      name: 'AudioPro Max',
      category: 'audio',
      price: 349,
      specs: {
        type: 'Over-ear',
        battery: '30 hours',
        connectivity: 'Bluetooth 5.2',
        features: 'ANC, Transparency Mode'
      },
      image: '/placeholder.svg',
      icon: <Headphones className="h-5 w-5" />
    },
    {
      id: 'powerbank-1',
      name: 'PowerMax 20000',
      category: 'accessories',
      price: 79,
      specs: {
        capacity: '20,000mAh',
        ports: '2x USB-A, 1x USB-C',
        charging: '60W Fast Charge',
        features: 'LED Display'
      },
      image: '/placeholder.svg',
      icon: <Battery className="h-5 w-5" />,
      isNew: true
    }
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section className="container mx-auto py-12 px-4" style={styleProps}>
      <AnimatedElement animation="fade-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">
            {t('electronics.specs')} • {t('electronics.features')} • {t('electronics.warranty')}
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 max-w-md mx-auto">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>
              All
            </TabsTrigger>
            <TabsTrigger value="laptops" onClick={() => setActiveCategory('laptops')}>
              {t('categories.laptops')}
            </TabsTrigger>
            <TabsTrigger value="smartphones" onClick={() => setActiveCategory('smartphones')}>
              {t('categories.smartphones')}
            </TabsTrigger>
            <TabsTrigger value="audio" onClick={() => setActiveCategory('audio')}>
              {t('categories.audio')}
            </TabsTrigger>
            <TabsTrigger value="accessories" onClick={() => setActiveCategory('accessories')}>
              {t('categories.accessories')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className={`grid ${variant === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
          {filteredProducts.map(product => (
            <AnimatedElement animation="fade-up" key={product.id}>
              <Card className="tech-card group h-full flex flex-col">
                <CardHeader className="relative">
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-tech-green text-white">New</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-tech-accent text-white">{product.discount}% OFF</Badge>
                    )}
                  </div>
                  <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {product.icon}
                    <Badge variant="outline" className="tech-badge">
                      {t(`categories.${product.category}`)}
                    </Badge>
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-black">
                      ${product.price.toFixed(2)}
                      {product.discount && (
                        <span className="text-gray-400 line-through ml-2 text-sm">
                          ${(product.price * (1 + product.discount/100)).toFixed(2)}
                        </span>
                      )}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-1">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div className="spec-row" key={key}>
                        <span className="text-gray-500">{key}</span>
                        <span className="text-gray-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    {t('products.viewDetails')}
                  </Button>
                  <Button className="w-full tech-gradient">
                    {t('products.addToCart')}
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </AnimatedElement>
    </section>
  );
}
