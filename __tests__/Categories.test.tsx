import { render, screen, waitFor } from "@testing-library/react";
import { Categories } from "@/components/Categories";
import { useCategoryStore } from "@/store/category";

const mockCategories = [
  { id: 1, title: "Category 1", created_at: new Date() },
  { id: 2, title: "Category 2", created_at: new Date() },
  { id: 3, title: "Category 3", created_at: new Date() },
];

const mockSetActiveCategory = jest.fn();

describe("Categories", () => {
  beforeEach(() => {
    useCategoryStore.setState({
      activeCategory: "Category 1",
      setActiveCategory: mockSetActiveCategory,
    });
  });
  it("Renders component", () => {
    render(<Categories categories={mockCategories} />);
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
    const activeCategory = screen.getByText("Category 1");
    expect(activeCategory).toHaveClass("text-orange-500");
  });
  it("Changes active category on click", async () => {
    render(<Categories categories={mockCategories} />);

    const activeCategory = screen.getByText("Category 1");
    expect(activeCategory).toHaveClass("text-orange-500");

    useCategoryStore.setState({ activeCategory: "Category 2" });

    const newCategory = screen.getByText("Category 2");
    await waitFor(() => expect(newCategory).toHaveClass("text-orange-500"));

    expect(activeCategory).not.toHaveClass("text-orange-500");
  });
});
