"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PizzaOptions } from "../PizzaOptions";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface PizzaModalProps {
  product: any;
}

export const PizzaModalComponent: React.FC<PizzaModalProps> = ({ product }) => {
  const router = useRouter();
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

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="flex max-w-[960px] min-h-[500px] bg-white  flex-col md:flex-row overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex justify-center items-center w-full  ">
          <img
            className="w-full max-w-[300px] h-auto lg:max-w-[400px]"
            src={product.img}
            alt={product.title}
          />
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
            className="w-full"
            variant="destructive"
            onClick={() => {
              addToCart();
              toast.success("Вы успешно добавили товар в корзину.");
            }}
          >
            + Добавить за {price} Р
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
