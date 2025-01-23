// Cart.tsx
"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { CartItem } from "./СartItem";
import toast from "react-hot-toast";

interface CartProps {
  children: React.ReactNode;
}

export const Cart: React.FC<CartProps> = ({ children }) => {
  const { cartItems, totalPrice } = useCartStore((state) => state);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const moveToOrderPage = () => {
    if (user && user.emailVerified) {
      router.push("/checkout");
    } else if (user && !user.emailVerified) {
      toast.error(
        "Подтвердите электронную почту. Если вы уже подтвердили, пожалуйста, обновите страницу, чтобы перейти к оформлению заказа."
      );
    } else {
      toast.error(
        "Вы не авторизованы. Авторизуйтесь, чтобы перейти к оформлению заказа."
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-4 flex flex-col h-full">
        <SheetHeader>
          <SheetTitle
            hidden={cartItems.length === 0}
            className="mb-4 text-lg sm:text-xl"
          >
            Ваша корзина:
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src="/img/emptyCartIcon.png" className="mb-4" alt="" />
              <p className="text-lg font-semibold text-center">
                Ваша корзина пуста. Пожалуйста, добавьте товары, чтобы
                продолжить.
              </p>
            </div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        {cartItems.length != 0 && (
          <SheetFooter className="mt-6">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-lg font-semibold">Сумма заказа:</p>
                <p className="text-lg font-semibold">{totalPrice} ₽</p>
              </div>
              <Button variant="destructive" onClick={() => moveToOrderPage()}>
                Оформить заказ
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
