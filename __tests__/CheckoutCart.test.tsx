import { render, screen } from "@testing-library/react";
import { CheckoutCart } from "@/components/CheckoutCart";
import { useCartStore } from "@/store/cart";

const mockAddCartItem = jest.fn();
const mockDecreaseCartItem = jest.fn();
const mockDeleteCartItem = jest.fn();

const mockCartItems = [
  {
    id: 1,
    img: "https://example.com/image1.jpg",
    title: "Товар 1",
    desc: "Описание товара 1",
    pizzaSize: "30",
    pizzaType: "традиционное",
    price: 500,
    quantity: 2,
    ingredients: [],
  },
  {
    id: 2,
    img: "https://example.com/image2.jpg",
    title: "Товар 2",
    desc: "Описание товара 2",
    pizzaSize: "30",
    pizzaType: "традиционное",
    price: 800,
    quantity: 1,
    ingredients: [],
  },
];

describe("CheckoutCart", () => {
  beforeEach(() => {
    useCartStore.setState({
      cartItems: mockCartItems,
      addCartItem: mockAddCartItem,
      decreaseCartItem: mockDecreaseCartItem,
      deleteCartItem: mockDeleteCartItem,
    });
  });

  it("Renders Component", () => {
    render(<CheckoutCart />);
    expect(screen.getByText("1. Корзина")).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(mockCartItems.length);
  });

  it("Empty cart", () => {
    useCartStore.setState({ cartItems: [] });
    render(<CheckoutCart />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
