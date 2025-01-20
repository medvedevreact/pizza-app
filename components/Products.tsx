"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Product } from "./Product";
import { useIntersectionObserver } from "usehooks-ts";
import { useCategoryStore } from "@/store/category";
import { useMediaQuery } from "react-responsive";

interface ProductsProps {
  products: any[];
  className?: string;
}

export const Products: React.FC<ProductsProps> = ({ products, className }) => {
  const setActiveCategory = useCategoryStore(
    (state) => state.setActiveCategory
  );

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const threshold = isMobile ? 0.1 : 0.6;

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: threshold,
  });

  useEffect(() => {
    if (isIntersecting) {
      setActiveCategory(categoryMapping[products[0].categoryId]);
    }
  }, [isIntersecting]);

  const categoryMapping = {
    1: "Пиццы",
    2: "Закуски",
    3: "Напитки",
  };

  return (
    <div
      className="py-4"
      ref={ref}
      id={`${categoryMapping[products[0].categoryId]}`}
    >
      <h2 className="text-2xl mb-10">
        {categoryMapping[products[0].categoryId]}
      </h2>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between mb-20",
          className
        )}
      >
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
