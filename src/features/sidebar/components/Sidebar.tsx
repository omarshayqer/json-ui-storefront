
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface SidebarProps {
  categories?: string[];
}

export default function Sidebar({ categories = [] }: SidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 200]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <a href="/shop" className="text-brand-dark hover:text-brand flex justify-between">
              <span>All Products</span>
              <Badge variant="outline">All</Badge>
            </a>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <a 
                href={`/shop?category=${category.toLowerCase()}`}
                className="text-gray-700 hover:text-brand flex justify-between"
              >
                <span>{category}</span>
                <Badge variant="outline">10</Badge>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="my-6" />

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          max={200}
          step={5}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <div className="bg-gray-100 rounded px-3 py-2 w-20 text-center">
            ${priceRange[0]}
          </div>
          <span className="text-gray-500">to</span>
          <div className="bg-gray-100 rounded px-3 py-2 w-20 text-center">
            ${priceRange[1]}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded text-brand mr-2" />
                <div className="flex">
                  {Array(rating).fill(null).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                  {Array(5 - rating).fill(null).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gray-300 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-700">& Up</span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
