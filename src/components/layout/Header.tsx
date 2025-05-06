
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, ShoppingCart, User } from 'lucide-react';

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
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className="px-3 py-2 text-gray-700 hover:text-brand">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-brand">Shop</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {["Clothing", "Electronics", "Home", "Beauty"].map((category) => (
                      <li key={category}>
                        <NavigationMenuLink asChild>
                          <Link 
                            to={`/shop?category=${category.toLowerCase()}`} 
                            className="block p-3 rounded-md hover:bg-gray-100"
                          >
                            <div className="text-sm font-medium text-gray-900">{category}</div>
                            <p className="text-sm text-gray-500">
                              Browse our {category.toLowerCase()} collection
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="#" className="px-3 py-2 text-gray-700 hover:text-brand">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="#" className="px-3 py-2 text-gray-700 hover:text-brand">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 bg-brand text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">3</span>
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
