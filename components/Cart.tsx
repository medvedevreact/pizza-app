"use client";
import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const moveToOrderPage = async () => {
    setIsLoading(true);
    if (user) {
      await user.reload();

      if (user.emailVerified) {
        router.push("/checkout");
      } else {
        toast.error(
          "Подтвердите электронную почту. Сообщение уже отправлено на почту"
        );
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } else {
      toast.error(
        "Вы не авторизованы. Авторизуйтесь, чтобы перейти к оформлению заказа."
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div data-testid="cart">
      <Sheet>
        <SheetTrigger data-testid="trigger" asChild>
          {children}
        </SheetTrigger>
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
                <Button
                  variant="destructive"
                  onClick={() => moveToOrderPage()}
                  disabled={isLoading}
                  className="flex items-center justify-center w-full"
                >
                  {isLoading ? (
                    <div className="border-4 border-t-4 border-gray-700 border-t-white rounded-full w-6 h-6 animate-spin"></div>
                  ) : (
                    "Оформить заказ"
                  )}
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
