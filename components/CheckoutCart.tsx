"use client";
import React from "react";

import { WhiteBlock } from "./WhiteBlock";
import { useCartStore } from "@/store/cart";
import { CartItem } from "./СartItem";

interface CheckoutCartProps {
  className?: string;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({}) => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <WhiteBlock className="mb-5" title="1. Корзина">
      <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-auto p-2">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </WhiteBlock>
  );
};
