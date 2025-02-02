import React from "react";
import { render, screen } from "@testing-library/react";
import { Cart } from "@/components/Cart";
import { useCartStore } from "@/store/cart";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockAddCartItem = jest.fn();
const mockDecreaseCartItem = jest.fn();
const mockDeleteCartItem = jest.fn();

const item = {
  id: 1,
  img: "https://media.dodostatic.net/image/r:292x292/11ee7d610a62d78598406363a9a8ad65.jpg",
  title: "Пепперони",
  desc: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
  pizzaSize: "30",
  pizzaType: "традиционное",
  price: 568,
  quantity: 1,
  ingredients: [
    {
      id: 3,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
      name: "Сыры чеддер и пармезан",
      price: 79,
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
  ],
};

describe("Cart", () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: [],
      totalPrice: 0,
      addCartItem: mockAddCartItem,
      decreaseCartItem: mockDecreaseCartItem,
      deleteCartItem: mockDeleteCartItem,
    });
  });

  it("Renders component", () => {
    render(
      <Cart>
        <button>Open</button>
      </Cart>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("Opens the cart when the trigger is clicked", async () => {
    render(
      <Cart>
        <button>Open</button>
      </Cart>
    );
    const openTrigger = screen.getByText("Open");
    await userEvent.click(openTrigger);
    expect(
      screen.getByText(
        "Ваша корзина пуста. Пожалуйста, добавьте товары, чтобы продолжить."
      )
    ).toBeInTheDocument();
  });

  it("Displays empty cart message when there are no items", async () => {
    render(
      <Cart>
        <button>Open</button>
      </Cart>
    );
    const openTrigger = screen.getByText("Open");
    await userEvent.click(openTrigger);
    expect(
      screen.getByText(
        "Ваша корзина пуста. Пожалуйста, добавьте товары, чтобы продолжить."
      )
    ).toBeInTheDocument();
  });

  it("Displays cart items when there are items in the cart", async () => {
    useCartStore.setState({
      cartItems: [item],
      totalPrice: item.price,
    });

    render(
      <Cart>
        <button>Open</button>
      </Cart>
    );
    const openTrigger = screen.getByText("Open");
    await userEvent.click(openTrigger);
    expect(screen.getByText("Пепперони")).toBeInTheDocument();
  });

  it("Displays the total price correctly", async () => {
    useCartStore.setState({
      cartItems: [item],
      totalPrice: item.price,
    });

    render(
      <Cart>
        <button>Open</button>
      </Cart>
    );
    const openTrigger = screen.getByText("Open");
    await userEvent.click(openTrigger);
    expect(screen.getByTestId("total-price")).toHaveTextContent("568 ₽");
  });
});
