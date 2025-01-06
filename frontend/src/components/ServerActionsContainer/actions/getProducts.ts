"use server";

export async function getProducts() {
  const response = await fetch(`${process.env.NEXT_DOCKER_API_URL}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
