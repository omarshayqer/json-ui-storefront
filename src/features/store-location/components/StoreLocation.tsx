
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface StoreLocationProps {
  variant?: 'minimal' | 'standard' | 'premium';
  title?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
}

export default function StoreLocation({
  variant = 'standard',
  title = "Visit Us In Store",
  address = "123 Shopping Avenue, New York, NY 10001",
  coordinates = { lat: 40.7128, lng: -74.006 },
  imageUrl = "https://images.unsplash.com/photo-1500673922987-e212871fec22"
}: StoreLocationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  if (variant === 'minimal') {
    return (
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{address}</p>
            </div>
            <Button size="sm" onClick={handleGetDirections}>
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'premium') {
    return (
      <div className="py-16 bg-gray-900 text-white">
        <div 
          className="container mx-auto px-4"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0.5rem'
          }}
        >
          <div className="max-w-md py-16 px-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="mb-6 text-lg opacity-90">{address}</p>
            <div className="space-y-4">
              <p className="opacity-80">
                <strong>Hours:</strong><br />
                Monday - Friday: 10am - 9pm<br />
                Saturday: 10am - 8pm<br />
                Sunday: 11am - 6pm
              </p>
              <p className="opacity-80">
                <strong>Phone:</strong><br />
                (555) 123-4567
              </p>
            </div>
            <div className="mt-8 space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    View Store Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Store Information</DialogTitle>
                    <DialogDescription>
                      Find us at our flagship location in New York City.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <div className="aspect-video bg-gray-100 rounded-md mb-4">
                      <iframe
                        title="Store Location"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '0.375rem' }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSHdI2z_CAA-IiKvsU05uM2KacpYO6a-E&q=${address}`}
                      ></iframe>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-gray-600">{address}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 10am - 9pm<br />
                          Saturday: 10am - 8pm<br />
                          Sunday: 11am - 6pm
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Contact</h4>
                        <p className="text-gray-600">
                          Phone: (555) 123-4567<br />
                          Email: store@example.com
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full" onClick={handleGetDirections}>
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button onClick={handleGetDirections}>
                <MapPin className="h-5 w-5 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-6 text-gray-600">{address}</p>
            <div className="space-y-3">
              <p>
                <strong>Hours:</strong><br />
                Monday - Friday: 10am - 9pm<br />
                Saturday: 10am - 8pm<br />
                Sunday: 11am - 6pm
              </p>
              <p>
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>
            <Button className="mt-6" onClick={handleGetDirections}>
              <MapPin className="h-5 w-5 mr-2" />
              Get Directions
            </Button>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Store Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSHdI2z_CAA-IiKvsU05uM2KacpYO6a-E&q=${address}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
