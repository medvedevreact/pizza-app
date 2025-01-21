"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface ProductPageProps {
  product: any;
}

export const ProductPageComponent: React.FC<ProductPageProps> = ({
  product,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const productItem = product.items.find(
    (item) => item.productId === product.id
  );

  const addToCart = () => {
    addCartItem({
      title: product.title,
      desc: product.desc,
      img: product.img,

      price: productItem.price,
    });
  };
  return (
    <div className=" flex justify-between min-h-[400px] bg-white flex-col md:flex-row overflow-y-auto">
      <div className="flex items-center w-full max-w-[500px]">
        <img className="w-full h-auto" src={product.img} alt={product.title} />
      </div>
      <div className="bg-[rgb(240,240,240)] flex-grow p-4 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
          <p className="mb-4">{product.desc}</p>
        </div>
        <Button
          onClick={() => {
            addToCart();
            toast.success("Вы успешно добавили товар в корзину.");
          }}
          className="w-full"
          variant="destructive"
        >
          + Добавить за {product.items[0].price} Р
        </Button>
      </div>
    </div>
  );
};
