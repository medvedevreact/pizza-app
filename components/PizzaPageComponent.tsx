"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { PizzaOptions } from "./PizzaOptions";

interface PizzaPageComponentProps {
  product: any;
}

export const PizzaPageComponent: React.FC<PizzaPageComponentProps> = ({
  product,
}) => {
  const [price, setPrice] = useState(product.items[0].price);
  const [size, setSize] = useState("30");
  const [pizzaType, setPizzaType] = useState("традиционное");
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const handleIngredientChange = (ingredient: any) => {
    setSelectedIngredients((prev) =>
      prev.some((ing) => ing.id === ingredient.id)
        ? prev.filter((ing) => ing.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const productItem = product.items.find(
    (item) => item.pizzaSize === Number(size)
  );

  const ingredientsPrice = selectedIngredients.reduce(
    (sum, ing) => sum + ing.price,
    0
  );

  useEffect(() => {
    if (productItem) {
      setPrice(productItem.price + ingredientsPrice);
    }
  }, [size, selectedIngredients, productItem]);

  const addToCart = () => {
    addCartItem({
      title: product.title,
      desc: product.desc,
      img: product.img,
      pizzaSize: size,
      pizzaType: pizzaType,
      ingredients: selectedIngredients,
      price: price,
    });
  };

  console.log(product);

  return (
    <div className="flex justify-between min-h-[500px] bg-white flex-col md:flex-row overflow-y-auto">
      <div className="flex items-center w-full max-w-[500px]">
        <img className="w-full h-auto" src={product.img} alt={product.title} />
      </div>
      <div className="bg-[rgb(240,240,240)] flex-grow p-4 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
          <p className="mb-4">{product.desc}</p>
          <PizzaOptions
            product={product}
            size={size}
            setSize={setSize}
            pizzaType={pizzaType}
            setPizzaType={setPizzaType}
            selectedIngredients={selectedIngredients}
            handleIngredientChange={handleIngredientChange}
          />
        </div>
        <Button
          role="add-button"
          className="w-full"
          variant="destructive"
          onClick={addToCart}
        >
          + Добавить за {price} Р
        </Button>
      </div>
    </div>
  );
};
