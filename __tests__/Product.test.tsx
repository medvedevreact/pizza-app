import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Импортируем userEvent
import { Product } from "@/components/Product";

const product = {
  id: 10,
  title: "Ветчина и сыр",
  desc: "Ветчина, моцарелла и фирменный соус альфредо",
  img: "https://media.dodostatic.net/image/r:292x292/11ee7d60fda22358ac33c6a44eb093a2.jpg",
  items: [
    {
      id: 7,
      productId: 10,
      price: 429,
      pizzaSize: 30,
      created_at: new Date(),
    },
    {
      id: 8,
      productId: 10,
      price: 509,
      pizzaSize: 35,
      created_at: new Date(),
    },
    {
      id: 9,
      productId: 10,
      price: 609,
      pizzaSize: 40,
      created_at: new Date(),
    },
  ],
};

describe("Product", () => {
  it("Renders Component", () => {
    render(<Product product={product} />);

    expect(screen.getByText("Ветчина и сыр")).toBeInTheDocument();

    expect(
      screen.getByText("Ветчина, моцарелла и фирменный соус альфредо")
    ).toBeInTheDocument();

    expect(screen.getByText("Цена: от 429 Р")).toBeInTheDocument();
  });

  it("Check link correct", async () => {
    render(<Product product={product} />);

    const linkElement = screen.getByRole("link", { name: /ветчина и сыр/i });

    await userEvent.click(linkElement);

    expect(linkElement).toHaveAttribute("href", `/product/${product.id}`);
  });
});
