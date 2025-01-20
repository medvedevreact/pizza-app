"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface PizzaOptionsProps {
  className?: string;
  product: any;

  size: string;
  setSize: (size: string) => void;
  pizzaType: string;
  setPizzaType: (type: string) => void;
  selectedIngredients: any[];
  handleIngredientChange: (ingredient: any) => void;
}

export const PizzaOptions: React.FC<PizzaOptionsProps> = ({
  className,
  product,

  size,
  setSize,
  pizzaType,
  setPizzaType,
  selectedIngredients,
  handleIngredientChange,
}) => {
  return (
    <div className={cn("space-y-4 mb-10", className)}>
      <h2 className="text-lg font-semibold">Выберите размер пиццы:</h2>
      <div className="flex space-x-4">
        <label
          className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
            size === "30"
              ? "border-orange-500 bg-orange-300"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="size"
            value="30"
            checked={size === "30"}
            onChange={() => {
              setSize("30");
              setPizzaType("традиционное");
            }}
            className="hidden"
          />
          30 см
        </label>
        <label
          className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
            size === "35"
              ? "border-orange-500 bg-orange-300"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="size"
            value="35"
            checked={size === "35"}
            onChange={() => setSize("35")}
            className="hidden"
          />
          35 см
        </label>
        <label
          className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
            size === "40"
              ? "border-orange-500 bg-orange-300"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="size"
            value="40"
            checked={size === "40"}
            onChange={() => setSize("40")}
            className="hidden"
          />
          40 см
        </label>
      </div>

      <h2 className="text-lg font-semibold">Выберите тип теста:</h2>
      <div className="flex space-x-4">
        <label
          className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
            pizzaType === "традиционное"
              ? "border-orange-500 bg-orange-300"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="pizzaType"
            value="традиционное"
            checked={pizzaType === "традиционное"}
            onChange={() => setPizzaType("традиционное")}
            className="hidden"
          />
          Традиционное
        </label>
        <label
          className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
            pizzaType === "тонкое"
              ? "border-orange-500 bg-orange-300"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="pizzaType"
            value="тонкое"
            checked={pizzaType === "тонкое"}
            onChange={() => setPizzaType("тонкое")}
            className="hidden"
            disabled={size === "30"}
          />
          Тонкое
        </label>
      </div>

      <h2 className="text-lg font-semibold">Дополнительные ингредиенты:</h2>
      <div className="max-h-40 overflow-y-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Фото</th>
              <th className="py-2">Название</th>
              <th className="py-2">Цена</th>
              <th className="py-2">Добавить</th>
            </tr>
          </thead>
          <tbody>
            {product.ingredients.map((ingredient: any) => (
              <tr key={ingredient.id}>
                <td className="py-2">
                  <img
                    src={ingredient.img}
                    alt={ingredient.name}
                    className="w-10 h-10"
                  />
                </td>
                <td className="py-2">{ingredient.name}</td>
                <td className="py-2">{ingredient.price}</td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.some(
                      (ing) => ing.id === ingredient.id
                    )}
                    onChange={() => handleIngredientChange(ingredient)}
                    data-testid={`checkbox-${ingredient.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
