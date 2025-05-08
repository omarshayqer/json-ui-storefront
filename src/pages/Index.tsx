
import DynamicPage from '@/components/dynamic-page/DynamicPage';
import { useEffect } from 'react';
import { AnimatedElement } from '@/components/ui/animated-element';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const Index = () => {
  useScrollToTop();
  
  // Add smooth scrolling behavior for all internal links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.includes('#') && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const id = link.href.split('#')[1];
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };
    
    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <AnimatedElement animation="fade-up" className="min-h-screen">
      <DynamicPage pageName="home" />
    </AnimatedElement>
  );
};

export default Index;
