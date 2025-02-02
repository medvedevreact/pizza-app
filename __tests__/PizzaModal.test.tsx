import React from "react";
import { render, screen } from "@testing-library/react";

import { useCartStore } from "@/store/cart";
import userEvent from "@testing-library/user-event";
import { PizzaModalComponent } from "@/components/modals/PizzaModalComponent";

const product = {
  title: "Сырная",
  desc: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
  img: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
  items: [
    { pizzaSize: 30, price: 459 },
    { pizzaSize: 35, price: 489 },
    { pizzaSize: 40, price: 699 },
  ],
  ingredients: [
    { id: 1, name: "Шампиньоны", price: 59 },
    { id: 2, name: "Ветчина", price: 79 },
    { id: 3, name: "Пикантная пепперони", price: 79 },
  ],
};

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockAddCartItem = jest.fn();

describe("PizzaModalComponent", () => {
  beforeAll(() => {
    useCartStore.setState({
      cartItems: [],
      addCartItem: mockAddCartItem,
    });
  });

  it("Renders component", () => {
    render(<PizzaModalComponent product={product} />);
    expect(screen.getByText("Сырная")).toBeInTheDocument();
  });

  it("Add product to cart", async () => {
    render(<PizzaModalComponent product={product} />);
    const button = screen.getByText("+ Добавить за 459 Р");
    await userEvent.click(button);

    expect(mockAddCartItem).toHaveBeenCalledTimes(1);
  });
});
