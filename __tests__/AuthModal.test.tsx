import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthModal } from "@/components/modals/AuthModal";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

const mockOnClose = jest.fn();
const mockSetUser = jest.fn();

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: "123", email: "test@example.com" } })
  ),
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: "456", email: "test@example.com" } })
  ),
  sendEmailVerification: jest.fn(() => Promise.resolve()),
  getAuth: jest.fn(() => ({})),
}));

describe("AuthModal Component", () => {
  beforeEach(() => {
    useUserStore.setState({
      user: null,
      setUser: mockSetUser,
    });
  });

  it("Renders The Login Form When IsLogin Is True", () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Вход")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByText("Зарегистрироваться")).toBeInTheDocument();
  });

  it("Renders The Registration Form When IsLogin Is False", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    await userEvent.click(screen.getByText("Зарегистрироваться"));
    expect(screen.getByText("Регистрация")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByLabelText("Подтвердите пароль")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
  });

  it("Calls OnClose When The Close Button Is Clicked", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    await userEvent.click(screen.getByTestId("onClose"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("Displays Error Message When Passwords Do Not Match During Registration", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);
    await userEvent.click(screen.getByText("Зарегистрироваться"));

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");
    await userEvent.type(
      screen.getByLabelText("Подтвердите пароль"),
      "password456"
    );

    await userEvent.click(screen.getByText("Зарегистрироваться"));

    expect(toast.error).toHaveBeenCalledWith("Пароли не совпадают.");
  });

  it("Successfully Signs In The User", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");

    await userEvent.click(screen.getByText("Войти"));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "password123"
    );

    expect(mockSetUser).toHaveBeenCalledWith({
      uid: "123",
      email: "test@example.com",
    });

    expect(toast.success).toHaveBeenCalledWith("Вы успешно вошли.");
  });

  it("Successfully Registers The User", async () => {
    render(<AuthModal isOpen={true} onClose={mockOnClose} />);

    await userEvent.click(screen.getByText("Зарегистрироваться"));

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");
    await userEvent.type(
      screen.getByLabelText("Подтвердите пароль"),
      "password123"
    );

    await userEvent.click(screen.getByText("Зарегистрироваться"));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "test@example.com",
      "password123"
    );

    expect(mockSetUser).toHaveBeenCalledWith({
      uid: "456",
      email: "test@example.com",
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Вы успешно зарегистрировались. Пожалуйста, проверьте свою почту для верификации."
    );
  });
});
