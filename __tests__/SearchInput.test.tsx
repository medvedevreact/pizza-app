import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "@/components/SearchInput";
import { fetchProducts } from "@/services/products";

const mockPush = jest.fn();

jest.mock("@/services/products", () => ({
  fetchProducts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SearchInput", () => {
  it("Renders component", () => {
    render(<SearchInput />);
    expect(
      screen.getByPlaceholderText("Введите название...")
    ).toBeInTheDocument();
  });

  it("Changes input value", async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Введите название...");
    expect(input).toHaveValue("");
    await userEvent.type(input, "test");
    expect(input).toHaveValue("test");
  });
  it("Fetches products", async () => {
    (fetchProducts as jest.Mock).mockResolvedValue([
      { id: 1, img: "image.jpg", title: "Product" },
    ]);

    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Введите название...");

    await userEvent.type(input, "Пепперони");
    await waitFor(() => screen.getByText("Product"));

    expect(screen.getByText("Product")).toBeInTheDocument();
  });
  it("Clear input after fetch", async () => {
    (fetchProducts as jest.Mock).mockResolvedValue([
      { id: 1, img: "image.jpg", title: "Product" },
    ]);

    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Введите название...");

    await userEvent.type(input, "Пепперони");
    await waitFor(() => screen.getByText("Product"));

    expect(screen.getByText("Product")).toBeInTheDocument();

    await userEvent.clear(input);
    expect(screen.queryByText("Product")).not.toBeInTheDocument();
  });
  it("Change page after click on product", async () => {
    (fetchProducts as jest.Mock).mockResolvedValue([
      { id: 1, img: "image.jpg", title: "Product" },
    ]);

    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Введите название...");

    await userEvent.type(input, "Пепперони");
    await waitFor(() => screen.getByText("Product"));

    await userEvent.click(screen.getByText("Product"));
    expect(mockPush).toHaveBeenCalled();
  });
});
