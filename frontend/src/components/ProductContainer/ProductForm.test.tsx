import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "./ProductForm";

describe("ProductForm", () => {
  it("renders ProductForm component", () => {
    render(<ProductForm />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Preço")).toBeInTheDocument();
  });

  it("should show error message when form is submitted with empty fields", async () => {
    render(<ProductForm />);
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText("* Campo obrigatório");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("should show error message description when field has something", async () => {
    render(<ProductForm />);

    const nameField = screen.getByPlaceholderText("Digite o nome do produto");
    const priceField = screen.getByPlaceholderText("Digite o preço do produto");
    const descriptionField = screen.getByPlaceholderText(
      "Digite a descrição do produto"
    );

    fireEvent.change(nameField, { target: { value: "A" } });
    fireEvent.change(priceField, { target: { value: -1 } });
    fireEvent.change(descriptionField, { target: { value: "A" } });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("* Nome muito curto")).toBeInTheDocument();
      expect(
        screen.getByText("* Preço deve ser maior que 0")
      ).toBeInTheDocument();
      expect(screen.getByText("* Descrição muito curta")).toBeInTheDocument();
    });
  });
});
