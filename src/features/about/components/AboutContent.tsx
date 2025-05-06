
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AboutContentProps {
  layout?: 'standard' | 'premium' | 'minimal';
}

export default function AboutContent({ layout = 'standard' }: AboutContentProps) {
  if (layout === 'premium') {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2010, our premium eCommerce brand has been dedicated to providing 
              exceptional quality products that stand the test of time. We carefully curate 
              our collections to ensure that each item meets our high standards of craftsmanship.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of designers and artisans work together to create pieces that are both 
              beautiful and functional, using only the finest materials sourced from trusted suppliers.
            </p>
            <Button size="lg" className="mt-4">Learn More About Our Process</Button>
          </div>
          <div className="relative">
            <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Our premium products" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality", description: "We never compromise on quality, ensuring each product meets our exacting standards." },
              { title: "Sustainability", description: "Ethical sourcing and sustainable practices are at the heart of everything we do." },
              { title: "Innovation", description: "We continuously explore new designs and technologies to enhance our product offerings." }
            ].map((value, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (layout === 'minimal') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-2xl font-medium mb-8 text-gray-900">About</h2>
        <div className="prose prose-sm max-w-none">
          <p>
            Minimal Store was founded with a simple principle: less is more.
            We believe in quality over quantity, simplicity over complexity,
            and thoughtful consumption over excess.
          </p>
          <p>
            Our products are carefully selected to be functional, durable,
            and beautiful in their simplicity.
          </p>
          <p>
            Founded in 2018, we continue to curate essential items that
            bring value to everyday life.
          </p>
        </div>
      </div>
    );
  }
  
  // Standard layout default
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Company</h2>
          <p className="text-gray-600 mb-4">
            Dynamic eCommerce was founded with a passion for delivering high-quality products 
            to our customers. Since our inception, we've been dedicated to creating a seamless 
            shopping experience that combines variety, value, and convenience.
          </p>
          <p className="text-gray-600 mb-4">
            Our team is committed to sourcing the best products across various categories, 
            ensuring that our customers have access to the latest trends and timeless classics alike.
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
            alt="Our team" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Our Mission</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            We strive to provide our customers with a diverse range of quality products 
            at competitive prices, all while offering exceptional customer service. Our 
            goal is to make shopping with us easy, enjoyable, and rewarding.
          </p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Jane Doe", position: "CEO & Founder", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901" },
            { name: "John Smith", position: "Chief Marketing Officer", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" },
            { name: "Emily Wang", position: "Head of Product", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901" }
          ].map((member, index) => (
            <Card key={index}>
              <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="text-center py-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
