import React from "react";
import { render, screen } from "@testing-library/react";
import { CheckoutPersonal } from "@/components/CheckoutPersonal";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

describe("CheckoutPersonal", () => {
  const mockRegister = jest.fn();
  const mockErrors = {
    firstname: { message: "Имя обязательно" },
    lastname: { message: "Фамилия обязательна" },
    phone: { message: "Введите корректный номер телефона" },
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      formState: { errors: mockErrors },
    });
  });

  it("Renders component", () => {
    render(<CheckoutPersonal />);
    expect(screen.getByText("2. Персональные данные")).toBeInTheDocument();
    expect(screen.getByLabelText("Имя")).toBeInTheDocument();
    expect(screen.getByLabelText("Фамилия")).toBeInTheDocument();
    expect(screen.getByLabelText("Телефон")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Комментарий к заказу (опционально)")
    ).toBeInTheDocument();
  });
  it("Register", () => {
    render(<CheckoutPersonal />);
    expect(mockRegister).toHaveBeenCalledWith("firstname");
    expect(mockRegister).toHaveBeenCalledWith("lastname");
    expect(mockRegister).toHaveBeenCalledWith("phone");
    expect(mockRegister).toHaveBeenCalledWith("comment");
  });
  it("Errors", () => {
    render(<CheckoutPersonal />);
    expect(screen.getByText("Имя обязательно")).toBeInTheDocument();
    expect(screen.getByText("Фамилия обязательна")).toBeInTheDocument();
    expect(
      screen.getByText("Введите корректный номер телефона")
    ).toBeInTheDocument();
  });
});
