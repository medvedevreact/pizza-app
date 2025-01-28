import React from "react";
import { WhiteBlock } from "./WhiteBlock";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CheckoutTotalProps {
  className?: string;
  totalPrice: number;
  paymentMethod: string;
  handlePaymentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  user: any;
}

export const CheckoutTotal: React.FC<CheckoutTotalProps> = ({
  totalPrice,
  paymentMethod,
  handlePaymentChange,
  isLoading,
  user,
}) => {
  return (
    <WhiteBlock className="lg:w-[380px] h-full w-full" title="Итого:">
      <div className="flex flex-col justify-between h-full">
        <div className="text-2xl font-bold mb-8">
          Итоговая цена: {totalPrice} ₽
        </div>
        <div className="mb-8">
          <Label>Выберите способ оплаты:</Label>
          <div className="mt-2 flex flex-col gap-2">
            <label
              className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
                paymentMethod === "card"
                  ? "border-orange-500 bg-orange-300"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentChange}
                className="hidden"
              />
              Картой на кассе
            </label>
            <label
              data-testid="cashLabel"
              className={`px-4 py-2 border-2 rounded-full cursor-pointer transition-colors ${
                paymentMethod === "cash"
                  ? "border-orange-500 bg-orange-300"
                  : "border-gray-300"
              }`}
            >
              <input
                data-testid="cashBtn"
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentChange}
                className="hidden"
              />
              Наличными на кассе
            </label>
          </div>
        </div>
        <Button
          disabled={totalPrice === 0 || isLoading || !user}
          type="submit"
          className="w-full  py-2 bg-orange-500 text-white mb-3 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="border-4 border-t-4 border-gray-700 border-t-white rounded-full w-6 h-6 animate-spin"></div>
          ) : (
            "Создать заказ"
          )}
        </Button>
      </div>
    </WhiteBlock>
  );
};
