import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react'; // Import CheckSquare

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href: string;
  color: 'indigo' | 'emerald';
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon, features, href, color }) => (
  <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 border-l-4 border-${color}-500`}>
    {icon}
    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <ul className="text-sm text-gray-400 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <CheckSquare className="w-4 h-4 mr-2 text-green-400" />
          {feature}
        </li>
      ))}
    </ul>
    <Link href={href}>
      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-${color}-600 hover:bg-${color}-700 text-white transition duration-300 ease-in-out`}>
        Launch {title}
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </Link>
  </div>
);

export default ProductCard;