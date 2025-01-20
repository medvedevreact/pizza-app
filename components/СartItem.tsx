import React from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";

interface CartItemProps {
  item: any;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addCartItem, decreaseCartItem, deleteCartItem } = useCartStore(
    (state) => state
  );

  return (
    <div className="flex flex-col items-center justify-between border p-4 rounded-lg shadow-sm relative">
      <Trash2
        role="delete-button"
        className="text-gray-300 absolute top-3 right-3 cursor-pointer w-5"
        onClick={() => {
          deleteCartItem(item.id);
        }}
      />
      <div className="flex items-center space-x-4 w-full mb-3">
        <img
          src={item.img}
          alt={item.title}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-base font-semibold sm:text-lg">{item.title}</h3>
          <p className="text-xs text-gray-600 sm:text-sm">
            {item.pizzaSize} см, {item.pizzaType}
          </p>
          {item?.ingredients.length > 0 && (
            <p className="text-xs text-gray-600 sm:text-sm">
              + {item.ingredients.map((ing) => ing.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200 mb-3"></div>
      <div className="flex items-center space-x-4 justify-between w-full">
        <p className="text-sm font-semibold sm:text-md">
          {item.price * item.quantity} ₽
        </p>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            disabled={item.quantity === 1}
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => {
              decreaseCartItem(item.id);
            }}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => {
              addCartItem(item);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
