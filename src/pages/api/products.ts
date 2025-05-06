
import { NextApiRequest, NextApiResponse } from 'next';

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    description: "Soft and comfortable cotton t-shirt, perfect for everyday wear.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 79.99,
    description: "High-quality wireless earbuds with noise cancellation.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.8, count: 230 }
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: 14.95,
    description: "Elegant ceramic coffee mug, perfect for your morning brew.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.2, count: 95 }
  },
  {
    id: 4,
    name: "Organic Face Serum",
    price: 29.99,
    description: "Natural face serum with vitamin C for radiant skin.",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.7, count: 180 }
  },
  {
    id: 5,
    name: "Slim Fit Jeans",
    price: 49.99,
    description: "Contemporary slim fit jeans with comfort stretch.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.3, count: 138 }
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 149.99,
    description: "Feature-packed smartwatch with health tracking capabilities.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.6, count: 210 }
  },
  {
    id: 7,
    name: "Scented Candle Set",
    price: 34.95,
    description: "Set of 3 premium scented candles for a cozy atmosphere.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.4, count: 112 }
  },
  {
    id: 8,
    name: "Natural Moisturizer",
    price: 22.50,
    description: "Hydrating natural moisturizer suitable for all skin types.",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556227834-09924708cc83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.5, count: 125 }
  },
  {
    id: 9,
    name: "Hooded Sweatshirt",
    price: 39.99,
    description: "Comfortable hooded sweatshirt for casual wear.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.2, count: 98 }
  },
  {
    id: 10,
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable Bluetooth speaker with premium sound quality.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: { rate: 4.7, count: 185 }
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get query parameters
  const { limit, category } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category if specified
  if (category && typeof category === 'string') {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Limit the number of products if specified
  if (limit && typeof limit === 'string') {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      filteredProducts = filteredProducts.slice(0, limitNum);
    }
  }
  
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.status(200).json(filteredProducts);
  }, 300);
}
