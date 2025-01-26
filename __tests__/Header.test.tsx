import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from "@/components/Header";
import userEvent from "@testing-library/user-event";
import { useUserStore } from "@/store/user";
import { User } from "firebase/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUser = {
  uid: "69esPBpmjFYenLKrBxh3HW3xoh40",
  email: "test@mail.ru",
  emailVerified: false,
};

describe("Header", () => {
  it("Renders component", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /El PIZZA/i })
    ).toBeInTheDocument();
  });

  it("Opening a modal window", async () => {
    render(<Header />);
    const button = await waitFor(() => screen.getByText("Войти"));
    await userEvent.click(button);
    expect(screen.getByText("Вход")).toBeInTheDocument();
  });

  it("Sign out button works correctly", async () => {
    const mockSetUser = jest.fn();
    useUserStore.setState({
      user: mockUser as User,
      setUser: mockSetUser,
    });

    render(<Header />);
    const signOutButton = await waitFor(() => screen.getByText("Выйти"));
    await userEvent.click(signOutButton);
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });

  it("Cart Button", async () => {
    render(<Header />);
    const cartIcon = screen.getByTestId("cartIcon");
    await userEvent.click(cartIcon);
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });
});
