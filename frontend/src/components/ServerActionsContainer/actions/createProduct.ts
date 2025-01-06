"use server";

import { IProduct } from "@/interfaces/product";
import { redirect } from "next/navigation";

export async function createProduct(values: IProduct) {
  const response = await fetch(`${process.env.NEXT_DOCKER_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  redirect("/server-actions/?success=created&entity=Product");
}
