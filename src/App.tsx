
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShopPage from "./pages/shop";
import AboutPage from "./pages/about";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import OrdersPage from "./pages/orders";
import ProductDetailsPage from "./pages/product-details";
import NotFound from "./pages/NotFound";
import SupportButton from "./features/support/components/SupportButton";
import MiniCart from "./features/cart/components/MiniCart";
import './i18n/i18n'; // Import i18n configuration
import { useRtlDirection } from "./hooks/useRtlDirection";

const queryClient = new QueryClient();

const AppContent = () => {
  // Apply RTL/LTR direction
  useRtlDirection();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SupportButton position="bottom-right" theme="light" />
      <MiniCart position="right" theme="light" />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
