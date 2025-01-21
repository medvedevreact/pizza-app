"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { useCategoryStore } from "@/store/category";

interface CategoriesProps {
  className?: string;
  categories: {
    id: number;
    title: string;
    created_at: Date;
  }[];
}

export const Categories: React.FC<CategoriesProps> = ({
  className,
  categories,
}) => {
  const activeCategory = useCategoryStore((state) => state.activeCategory);

  return (
    <div className={cn("h-[75px] flex items-center bg-white", className)}>
      <Container className="flex justify-start w-full">
        <ul className="flex flex-wrap gap-[60px]">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.title}`}
                className={`cursor-pointer  py-2 ${
                  category.title === activeCategory ? "text-orange-500" : ""
                }`}
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
