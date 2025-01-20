import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PizzaOptions } from "@/components/PizzaOptions";

const mockProduct = {
  ingredients: [
    {
      id: 1,
      name: "Моцарелла",
      price: "100 Р",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Грибы",
      price: "50 Р",
      img: "https://via.placeholder.com/150",
    },
  ],
};

describe("PizzaOptions", () => {
  const setSize = jest.fn();
  const setPizzaType = jest.fn();
  const handleIngredientChange = jest.fn();

  const defaultProps = {
    product: mockProduct,
    size: "30",
    setSize,
    pizzaType: "традиционное",
    setPizzaType,
    selectedIngredients: [],
    handleIngredientChange,
  };

  it("Renders component", () => {
    render(<PizzaOptions {...defaultProps} />);

    expect(screen.getByLabelText(/30 см/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/35 см/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/40 см/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Традиционное/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Тонкое/i)).toBeInTheDocument();

    expect(screen.getByText(/Моцарелла/i)).toBeInTheDocument();
    expect(screen.getByText(/Грибы/i)).toBeInTheDocument();
  });

  it("Change size", async () => {
    render(<PizzaOptions {...defaultProps} />);

    const size35Input = screen.getByLabelText(/35 см/i);

    expect(screen.getByLabelText(/30 см/i)).toBeChecked();

    await userEvent.click(size35Input);

    expect(setSize).toHaveBeenCalledWith("35");
  });

  it("Change Type", async () => {
    render(<PizzaOptions {...defaultProps} size="35" />);

    const thinRadio = screen.getByLabelText(/Тонкое/i);

    expect(screen.getByLabelText(/Традиционное/i)).toBeChecked();

    await userEvent.click(thinRadio);

    expect(setPizzaType).toHaveBeenCalledWith("тонкое");
  });

  it("Select ingredient", async () => {
    render(<PizzaOptions {...defaultProps} />);

    const mozzarellaCheckbox = screen.getByTestId("checkbox-1");
    const mushroomsCheckbox = screen.getByTestId("checkbox-2");

    await userEvent.click(mozzarellaCheckbox);
    await userEvent.click(mushroomsCheckbox);

    expect(handleIngredientChange).toHaveBeenCalledWith(
      mockProduct.ingredients[0]
    );
    expect(handleIngredientChange).toHaveBeenCalledWith(
      mockProduct.ingredients[1]
    );
  });
});
