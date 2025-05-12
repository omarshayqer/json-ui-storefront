
import { useScrollToTop } from '@/hooks/useScrollToTop';
import DynamicPage from '@/components/dynamic-page/DynamicPage';
import { AnimatedElement } from '@/components/ui/animated-element';

export default function CheckoutPage() {
  useScrollToTop();

  return (
    <AnimatedElement animation="fade-up" className="min-h-screen">
      <DynamicPage pageName="checkout" />
    </AnimatedElement>
  );
}
