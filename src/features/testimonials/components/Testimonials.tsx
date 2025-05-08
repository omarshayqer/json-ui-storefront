
import { useState, useEffect } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role?: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  title?: string;
  variant?: 'minimal' | 'standard' | 'premium';
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export default function Testimonials({
  title = "What Our Customers Say",
  variant = 'standard',
  autoplay = true,
  autoplaySpeed = 5000
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Demo testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      role: "Verified Buyer",
      content: "I'm completely impressed with the quality of the products and the customer service. Will definitely be ordering again!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      role: "Loyal Customer",
      content: "Fast shipping, great packaging, and the product exceeded my expectations. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica Martinez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      role: "Verified Buyer",
      content: "The attention to detail on every product I've purchased has been outstanding. This is my go-to store now.",
      rating: 4
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
      role: "New Customer",
      content: "Was skeptical at first, but after receiving my order, I can confidently say this shop delivers on its promises.",
      rating: 5
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, testimonials.length]);

  // Render stars for ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "h-5 w-5",
              i < rating ? "text-yellow-400" : "text-gray-300"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (variant === 'minimal') {
    return (
      <div className="py-10">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-xl font-medium mb-6 text-center">{title}</h2>
          )}
          
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                      <div className="font-medium">{testimonial.name}</div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    activeIndex === index ? "bg-brand" : "bg-gray-300"
                  )}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </Carousel>
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
          
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="border-none shadow-lg h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="mb-6">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-700 italic flex-grow mb-6">"{testimonial.content}"</p>
                      <div className="flex items-center mt-auto">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.name}</div>
                          {testimonial.role && (
                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 sm:-left-5" />
            <CarouselNext className="-right-4 sm:-right-5" />
          </Carousel>
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    {testimonial.role && (
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
