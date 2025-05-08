
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Collection {
  id: string;
  name: string;
  image: string;
  productCount: number;
  path: string;
}

interface ProductCollectionProps {
  title?: string;
  autoScroll?: boolean;
  scrollSpeed?: number;
  variant?: 'minimal' | 'standard' | 'premium';
}

export default function ProductCollection({ 
  title = "Shop By Collection", 
  autoScroll = true,
  scrollSpeed = 30,
  variant = 'standard'
}: ProductCollectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  
  // Demo collections
  const collections: Collection[] = [
    {
      id: "new-arrivals",
      name: "New Arrivals",
      image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
      productCount: 24,
      path: "/shop?collection=new-arrivals"
    },
    {
      id: "best-sellers",
      name: "Best Sellers",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      productCount: 18,
      path: "/shop?collection=best-sellers"
    },
    {
      id: "summer-essentials",
      name: "Summer Essentials",
      image: "https://images.unsplash.com/photo-1526400473556-aac12354f3db",
      productCount: 32,
      path: "/shop?collection=summer-essentials"
    },
    {
      id: "trending-now",
      name: "Trending Now",
      image: "https://images.unsplash.com/photo-1507974297141-5e6e4b042f98",
      productCount: 15,
      path: "/shop?collection=trending-now"
    },
    {
      id: "winter-collection",
      name: "Winter Collection",
      image: "https://images.unsplash.com/photo-1519431940854-3238ebce4d3f",
      productCount: 27,
      path: "/shop?collection=winter-collection"
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1514419877253-494c9e73aecb",
      productCount: 42,
      path: "/shop?collection=accessories"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (!isPaused) {
        const scrollIncrement = (elapsed * scrollSpeed) / 1000;
        setScrollAmount(prevAmount => {
          // Reset when we've scrolled the entire width
          if (prevAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            return 0;
          }
          return prevAmount + scrollIncrement;
        });
        
        scrollContainer.scrollLeft = scrollAmount;
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoScroll, isPaused, scrollAmount, scrollSpeed]);

  if (variant === 'minimal') {
    return (
      <div className="py-8">
        {title && (
          <h2 className="text-xl font-medium mb-4 text-center">{title}</h2>
        )}
        
        <div 
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {collections.map((collection) => (
            <Link 
              key={collection.id}
              to={collection.path}
              className="flex-none w-36 group"
            >
              <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-100">
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-medium">{collection.name}</h3>
                <p className="text-xs text-gray-500">{collection.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  if (variant === 'premium') {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{title}</h2>
              <div className="w-24 h-1 bg-brand mx-auto mt-4"></div>
            </div>
          )}
          
          <div 
            className="flex overflow-x-auto snap-x scrollbar-hide space-x-6 pb-6"
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {collections.map((collection) => (
              <Link 
                key={collection.id}
                to={collection.path}
                className="flex-none w-72 snap-start group"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{collection.name}</h3>
                      <p className="text-white/80 mt-1">{collection.productCount} Items</p>
                      <div className="inline-block mt-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-sm font-medium border-b border-white pb-0.5">
                          Explore Collection
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" className="px-8">
              View All Collections
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold mb-8">{title}</h2>
        )}
        
        <div 
          className="grid grid-flow-col auto-cols-[280px] gap-6 overflow-x-auto pb-6 scrollbar-hide"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {collections.map((collection) => (
            <Link 
              key={collection.id}
              to={collection.path}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-md text-center transform group-hover:scale-105 transition-transform duration-300">
                    <h3 className="font-medium text-gray-900">{collection.name}</h3>
                    <p className="text-sm text-gray-500">{collection.productCount} Products</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/shop">
            <Button>View All Collections</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
