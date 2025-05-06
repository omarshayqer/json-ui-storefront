
import { useParams } from 'react-router-dom';
import DynamicPage from '@/components/dynamic-page/DynamicPage';

export default function ProductDetailsPage() {
  // Get the product ID from URL params
  const { id } = useParams<{ id: string }>();
  
  return <DynamicPage pageName="product-details" productId={id} />;
}
