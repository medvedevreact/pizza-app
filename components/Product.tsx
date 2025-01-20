import React from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";

interface ProductProps {
  product: any;
  className?: string;
}

export const Product: React.FC<ProductProps> = ({ product, className }) => {
  return (
    <div
      className={cn("border p-4 rounded-lg shadow-md w-72 relative", className)}
    >
      <Link href={`/product/${product.id}`} scroll={false}>
        <img
          src={product.img}
          alt={product.title}
          className="w-full object-cover mb-2 rounded-md cursor-pointer"
        />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">{product.desc}</p>
        <p className="text-gray-800 mb-4">
          Цена: от {product.items[0].price} Р
        </p>
        <button className="flex items-center text-orange-500 absolute bottom-4 right-4">
          <ShoppingCart className="mr-2" />В корзину
        </button>
      </Link>
    </div>
  );
};
