import { create } from "zustand";
import { isEqual } from "lodash";

interface CartState {
  cartItems: any[];
  addCartItem: (cartItem: any) => void;
  deleteCartItem: (cartItemId: string) => void;
  decreaseCartItem: (cartItemId: string) => void;
  totalPrice: number;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  totalPrice: 0,
  addCartItem: (cartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.title === cartItem.title &&
          item?.pizzaSize === cartItem?.pizzaSize &&
          isEqual(item.ingredients, cartItem.ingredients)
      );
      if (existingItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        const newTotalPrice = updatedCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return {
          cartItems: updatedCartItems,
          totalPrice: newTotalPrice,
        };
      } else {
        const newItem = {
          ...cartItem,
          quantity: 1,
          id: state.cartItems.length
            ? state.cartItems[state.cartItems.length - 1].id + 1
            : 1,
        };
        const newTotalPrice = state.totalPrice + newItem.price;
        return {
          cartItems: [...state.cartItems, newItem],
          totalPrice: newTotalPrice,
        };
      }
    }),
  deleteCartItem: (cartItemId) => {
    set((state) => {
      const item = state.cartItems.find((el) => el.id === cartItemId);
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== cartItemId
      );
      const newTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        cartItems: updatedCartItems,
        totalPrice: newTotalPrice,
      };
    });
  },
  decreaseCartItem: (cartItemId) =>
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      const newTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        cartItems: updatedCartItems,
        totalPrice: newTotalPrice,
      };
    }),
  resetCart: () =>
    set({
      cartItems: [],
      totalPrice: 0,
    }),
}));
