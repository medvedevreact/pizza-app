import { CheckoutTotal } from "@/components/CheckoutTotal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockHandlePaymentChange = jest.fn();

const defaultProps = {
  totalPrice: 1000,
  paymentMethod: "card",
  handlePaymentChange: mockHandlePaymentChange,
  isLoading: false,
  user: { name: "Test User" },
};

describe("CheckoutTotal", () => {
  it("Renders component", () => {
    render(<CheckoutTotal {...defaultProps} />);
    expect(screen.getByText("Итого:")).toBeInTheDocument();
    expect(screen.getByText(/Итоговая цена: 1000 ₽/i)).toBeInTheDocument();
  });

  it("PaymentChange calling", async () => {
    render(<CheckoutTotal {...defaultProps} />);
    const cashBtn = screen.getByTestId("cashBtn");

    await userEvent.click(cashBtn);
    expect(mockHandlePaymentChange).toHaveBeenCalled();
  });
  it("Button disabled", () => {
    const propsWithZeroTotalPrice = {
      ...defaultProps,
      totalPrice: 0,
    };
    render(<CheckoutTotal {...propsWithZeroTotalPrice} />);
    const orderBtn = screen.getByText(/Создать заказ/i);

    expect(orderBtn).toBeDisabled();
  });
});
