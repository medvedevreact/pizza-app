import React from "react";
import { render, screen } from "@testing-library/react";
import { PizzaPageComponent } from "@/components/PizzaPageComponent";
import { useCartStore } from "@/store/cart";
import userEvent from "@testing-library/user-event";

const item = {
  categoryId: 1,
  created_at: new Date(
    "Wed Jan 15 2025 18:44:53 GMT+0300 (Москва, стандартное время)"
  ),
  desc: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
  id: 9,
  img: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
  ingredients: [
    {
      id: 6,
      name: "Шампиньоны",
      price: 59,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 7,
      name: "Ветчина",
      price: 79,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 8,
      name: "Пикантная пепперони",
      price: 79,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 9,
      name: "Острая чоризо",
      price: 79,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 10,
      name: "Маринованные огурчики",
      price: 59,
      img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
      createdAt: new Date(
        "Wed Jan 15 2025 18:44:52 GMT+0300 (Москва, стандартное время)"
      ),
    },
  ],
  items: [
    {
      id: 4,
      productId: 9,
      price: 459,
      pizzaSize: 30,
      created_at: new Date(
        "Wed Jan 15 2025 18:44:54 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 5,
      productId: 9,
      price: 489,
      pizzaSize: 35,
      created_at: new Date(
        "Wed Jan 15 2025 18:44:55 GMT+0300 (Москва, стандартное время)"
      ),
    },
    {
      id: 6,
      productId: 9,
      price: 699,
      pizzaSize: 40,
      created_at: new Date(
        "Wed Jan 15 2025 18:44:55 GMT+0300 (Москва, стандартное время)"
      ),
    },
  ],
  title: "Сырная",
};

const mockAddCartItem = jest.fn();

describe("PizzaPageComponent", () => {
  beforeAll(() => {
    useCartStore.setState({
      cartItems: [],
      addCartItem: mockAddCartItem,
    });
  });
  it("Renders component", () => {
    render(<PizzaPageComponent product={item} />);
    expect(screen.getByText("Сырная")).toBeInTheDocument();
  });
  it("Add product to cart", async () => {
    render(<PizzaPageComponent product={item} />);
    const button = screen.getByRole("add-button");
    await userEvent.click(button);

    expect(mockAddCartItem).toHaveBeenCalledTimes(1);
  });
});
