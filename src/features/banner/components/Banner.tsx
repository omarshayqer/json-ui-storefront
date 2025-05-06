
import { Button } from '@/components/ui/button';

interface BannerProps {
  variant?: 'hero' | 'promo' | 'simple';
  title?: string;
  subtitle?: string;
}

export default function Banner({ variant = 'simple', title, subtitle }: BannerProps) {
  // Determine banner style based on variant
  switch (variant) {
    case 'hero':
      return (
        <section className="relative bg-gradient-to-r from-blue-500 to-brand-dark text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl mb-8">{subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" className="bg-white text-brand-dark hover:bg-gray-100">
                  Shop Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        </section>
      );

    case 'promo':
      return (
        <section className="bg-brand-light/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-brand-dark bg-brand-light/20 rounded-full">
                    Limited Time Offer
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{title}</h2>
                  <p className="text-lg mb-6 text-gray-600">{subtitle}</p>
                  <Button className="w-full md:w-auto bg-brand hover:bg-brand-dark">
                    Shop the Sale
                  </Button>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-brand to-brand-dark p-8 text-white flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg mb-2">Sale Ends In</p>
                    <div className="flex justify-center space-x-4 text-2xl font-bold">
                      <div className="bg-white/20 rounded-lg p-3">
                        <span>2</span>
                        <p className="text-xs font-normal mt-1">Days</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <span>12</span>
                        <p className="text-xs font-normal mt-1">Hours</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <span>45</span>
                        <p className="text-xs font-normal mt-1">Minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'simple':
    default:
      return (
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
          </div>
        </section>
      );
  }
}
