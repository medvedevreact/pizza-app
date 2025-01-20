import React from "react";
import { render, screen } from "@testing-library/react";
import { Products } from "@/components/Products";
import { useCategoryStore } from "@/store/category";

const mockIntersectionObserver = jest.fn();

jest.mock("usehooks-ts", () => ({
  useIntersectionObserver: () => mockIntersectionObserver(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockSetActiveCategory = jest.fn();

const products = [
  {
    id: 8,
    title: "Пепперони",
    desc: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d610a62d78598406363a9a8ad65.jpg",
    category: "Пиццы",
    created_at: new Date(),
    categoryId: 1,
    items: [
      {
        id: 1,
        productId: 8,
        price: 489,
        pizzaSize: 30,
        created_at: new Date(),
      },
      {
        id: 2,
        productId: 8,
        price: 539,
        pizzaSize: 35,
        created_at: new Date(),
      },
      {
        id: 3,
        productId: 8,
        price: 579,
        pizzaSize: 40,
        created_at: new Date(),
      },
    ],
  },
];

describe("Product", () => {
  beforeEach(() => {
    useCategoryStore.setState({
      activeCategory: "Пиццы",
      setActiveCategory: mockSetActiveCategory,
    });

    mockIntersectionObserver.mockReturnValue({
      isIntersecting: false,
      ref: jest.fn(),
    });
  });

  it("Renders component", () => {
    render(<Products products={products} />);
    expect(screen.getByText("Пиццы")).toBeInTheDocument();
    expect(screen.getByText("Пепперони")).toBeInTheDocument();
  });

  it("Sets active category on intersection", () => {
    mockIntersectionObserver.mockReturnValue({
      isIntersecting: true,
      ref: jest.fn(),
    });

    render(<Products products={products} />);
    expect(screen.getByText("Пиццы")).toBeInTheDocument();
    expect(screen.getByText("Пепперони")).toBeInTheDocument();

    expect(mockSetActiveCategory).toHaveBeenCalledWith("Пиццы");
  });
});
