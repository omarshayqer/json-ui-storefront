
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import DynamicNav from './DynamicNav';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-brand-dark">Dynamic eCommerce</span>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <div className="hidden md:flex items-center">
            <DynamicNav />
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-brand">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-brand">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-brand relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 bg-brand text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">3</span>
              </Link>
            </Button>
            
            <Button className="bg-brand hover:bg-brand-dark hidden md:inline-flex">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
