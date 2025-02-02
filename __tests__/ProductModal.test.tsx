import React from "react";
import { render, screen } from "@testing-library/react";

import { useCartStore } from "@/store/cart";
import userEvent from "@testing-library/user-event";

import toast from "react-hot-toast";
import { ProductModalComponent } from "@/components/modals/ProductModalComponent";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

const product = {
  title: "Сырная",
  desc: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
  img: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
  items: [
    { pizzaSize: 30, price: 459 },
    { pizzaSize: 35, price: 489 },
    { pizzaSize: 40, price: 699 },
  ],
};

const mockAddCartItem = jest.fn();

describe("ProductModalComponent", () => {
  beforeAll(() => {
    useCartStore.setState({
      cartItems: [],
      addCartItem: mockAddCartItem,
    });
  });

  it("Renders component", () => {
    render(<ProductModalComponent product={product} />);
    expect(screen.getByText("Сырная")).toBeInTheDocument();
  });

  it("Add product to cart", async () => {
    render(<ProductModalComponent product={product} />);
    const button = screen.getByText("+ Добавить за 459 Р");
    await userEvent.click(button);

    expect(mockAddCartItem).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      "Вы успешно добавили товар в корзину."
    );
  });
});
