import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartItem } from "@/components/СartItem";
import { useCartStore } from "@/store/cart";

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

describe("CartItem", () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: [
        {
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
        },
      ],
      addCartItem: mockAddCartItem,
      decreaseCartItem: mockDecreaseCartItem,
      deleteCartItem: mockDeleteCartItem,
    });
  });

  it("Renders component", () => {
    render(<CartItem item={item} />);

    const itemTitle = screen.getByText("Пепперони");
    const itemPrice = screen.getByText("568 ₽");
    const itemQuantity = screen.getByText("1");

    expect(itemTitle).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
    expect(itemQuantity).toBeInTheDocument();
  });

  it("Disabled button", () => {
    render(<CartItem item={item} />);
    const decreaseBtn = screen.getByText("-");
    expect(decreaseBtn).toBeDisabled();
  });

  it("Decrease quantity", async () => {
    const modifiedItem = { ...item, quantity: 2 };
    render(<CartItem item={modifiedItem} />);
    const decreaseBtn = screen.getByText("-");

    await userEvent.click(decreaseBtn);

    expect(mockDecreaseCartItem).toHaveBeenCalledTimes(1);
    expect(mockDecreaseCartItem).toHaveBeenCalledWith(item.id);
  });

  it("Increase Quantity", async () => {
    render(<CartItem item={item} />);
    const addButton = screen.getByText("+");

    await userEvent.click(addButton);

    expect(mockAddCartItem).toHaveBeenCalledTimes(1);
    expect(mockAddCartItem).toHaveBeenCalledWith(item);
  });

  it("Delete Item", async () => {
    render(<CartItem item={item} />);
    const deleteButton = screen.getByRole("delete-button");

    await userEvent.click(deleteButton);

    expect(mockDeleteCartItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteCartItem).toHaveBeenCalledWith(item.id);
  });
});
