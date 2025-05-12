
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Laptop, Smartphone, Monitor, Headphones } from 'lucide-react';
import { useStyleConfig } from '@/hooks/useStyleConfig';

interface SpecComparisonProps {
  style?: any;
}

export default function SpecsComparison({ style }: SpecComparisonProps) {
  const { t } = useTranslation();
  const styleProps = useStyleConfig(style);
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['laptop-1', 'laptop-2']);
  
  const products = [
    {
      id: 'laptop-1',
      name: 'UltraBook Pro',
      category: 'laptops',
      icon: <Laptop className="h-5 w-5" />,
      specs: {
        cpu: 'Intel i7-12700H',
        ram: '16GB DDR5',
        storage: '512GB NVMe SSD',
        display: '15.6" 4K OLED',
        gpu: 'NVIDIA RTX 3070',
        battery: '8 hours',
        weight: '1.8 kg',
        ports: '2x USB-C, 1x HDMI, Audio jack'
      }
    },
    {
      id: 'laptop-2',
      name: 'MacBook Pro',
      category: 'laptops',
      icon: <Laptop className="h-5 w-5" />,
      specs: {
        cpu: 'Apple M2 Pro',
        ram: '16GB Unified',
        storage: '512GB SSD',
        display: '14.2" Liquid Retina XDR',
        gpu: 'Integrated 16-core',
        battery: '18 hours',
        weight: '1.6 kg',
        ports: '3x USB-C, 1x HDMI, Audio jack, SD card'
      }
    },
    {
      id: 'phone-1',
      name: 'iPhone 14 Pro',
      category: 'smartphones',
      icon: <Smartphone className="h-5 w-5" />,
      specs: {
        cpu: 'A16 Bionic',
        ram: '6GB',
        storage: '256GB',
        display: '6.1" Super Retina XDR',
        gpu: 'Apple GPU (5-core)',
        battery: '29 hours talk time',
        weight: '206 g',
        ports: 'Lightning'
      }
    },
    {
      id: 'monitor-1',
      name: 'UltraView Pro',
      category: 'monitors',
      icon: <Monitor className="h-5 w-5" />,
      specs: {
        display: '32" 4K UHD',
        panel: 'IPS',
        refreshRate: '144Hz',
        responseTime: '1ms',
        color: '99% Adobe RGB',
        hdr: 'HDR 600',
        ports: '2x HDMI 2.1, 1x DP 1.4, USB-C',
        features: 'Pivot, Height adjust, VESA'
      }
    },
    {
      id: 'headphones-1',
      name: 'Sony WH-1000XM5',
      category: 'audio',
      icon: <Headphones className="h-5 w-5" />,
      specs: {
        type: 'Over-ear',
        battery: '30 hours',
        connectivity: 'Bluetooth 5.2, 3.5mm',
        features: 'ANC, Transparency Mode, Multi-point',
        driver: '40mm',
        weight: '250g',
        charging: 'USB-C',
        codecs: 'LDAC, AAC, SBC'
      }
    }
  ];
  
  const filteredProducts = products.filter(product => selectedProducts.includes(product.id));
  
  // Get all spec keys from selected products
  const allSpecKeys = new Set<string>();
  filteredProducts.forEach(product => {
    Object.keys(product.specs).forEach(key => allSpecKeys.add(key));
  });
  
  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  return (
    <section className="container mx-auto py-12 px-4" style={styleProps}>
      <AnimatedElement animation="fade-up" className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('electronics.specs')}</h2>
          <p className="text-muted-foreground">
            Compare technical specifications of our products
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {products.map((product) => (
            <label key={product.id} className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 px-4">
              <Checkbox 
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => handleProductToggle(product.id)}
              />
              <span className="flex items-center gap-1">
                {product.icon} {product.name}
              </span>
            </label>
          ))}
        </div>
        
        <div className="relative overflow-x-auto rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Specification</TableHead>
                {filteredProducts.map(product => (
                  <TableHead key={product.id}>
                    <div className="flex items-center gap-1">
                      {product.icon} {product.name}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from(allSpecKeys).map(specKey => (
                <TableRow key={specKey}>
                  <TableCell className="font-medium">{specKey}</TableCell>
                  {filteredProducts.map(product => (
                    <TableCell key={`${product.id}-${specKey}`}>
                      {product.specs[specKey as keyof typeof product.specs] || '—'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AnimatedElement>
    </section>
  );
}
