"use server";

import { IProduct } from "@/interfaces/product";
import { redirect } from "next/navigation";

export default async function updateProduct(product: IProduct) {
  const response = await fetch(
    `${process.env.NEXT_DOCKER_API_URL}/products/${product.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    console.log("error");
    throw new Error("Failed to update product");
  }

  redirect("/server-actions/?success=updated&entity=Product");
}
