
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Dynamic eCommerce</h3>
            <p className="text-gray-600 mb-4">
              Creating beautiful shopping experiences with dynamic layouts.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-600 hover:text-brand">All Products</Link></li>
              <li><Link to="/shop?category=clothing" className="text-gray-600 hover:text-brand">Clothing</Link></li>
              <li><Link to="/shop?category=electronics" className="text-gray-600 hover:text-brand">Electronics</Link></li>
              <li><Link to="/shop?category=home" className="text-gray-600 hover:text-brand">Home</Link></li>
              <li><Link to="/shop?category=beauty" className="text-gray-600 hover:text-brand">Beauty</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-brand">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Careers</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-bold uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-brand">Help Center</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Shipping</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Returns</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-brand">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Dynamic eCommerce. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-600 hover:text-brand">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-brand">
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.232.585 1.777 1.14.555.564.88 1.111 1.143 1.776.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427-.25.668-.585 1.232-1.143 1.776-.536.565-1.104.902-1.777 1.143-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.232-.585-1.776-1.143-.566-.536-.902-1.104-1.143-1.776-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.232 1.143-1.776.536-.566 1.104-.902 1.776-1.143.636-.247 1.363-.416 2.427-.465C9.39 2.013 9.745 2 12.175 2h.144z" clipRule="evenodd" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
            <Link to="#" className="text-gray-600 hover:text-brand">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
