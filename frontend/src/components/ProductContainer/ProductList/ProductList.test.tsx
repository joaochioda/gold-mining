import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";
import { useRequest } from "../../../hooks/useRequest";

jest.mock("../../../hooks/useRequest");

describe("ProductList", () => {
  it("should render loading state", () => {
    (useRequest as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<ProductList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render error message", () => {
    (useRequest as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "Something bad happened" },
      isLoading: false,
    });

    render(<ProductList />);

    expect(screen.getByText(/Something bad happened/i)).toBeInTheDocument();
  });

  it("should render produt list with informations", async () => {
    const mockData = [
      { id: "1", name: "Produto 1", price: 100, description: "Descrição 1" },
      { id: "2", name: "Produto 2", price: 200, description: "Descrição 2" },
    ];

    (useRequest as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<ProductList />);

    expect(screen.getByText(/Produto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Produto 2/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição 2/i)).toBeInTheDocument();
  });
});
