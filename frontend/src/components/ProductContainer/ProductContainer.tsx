import React from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList/ProductList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const ProductContainer = () => {
  return (
    <div
      className="flex 
      flex-col
      gap-4
      sm:flex-row
    "
    >
      <ErrorBoundary>
        <ProductForm />
        <ProductList />
      </ErrorBoundary>
    </div>
  );
};

export default ProductContainer;
