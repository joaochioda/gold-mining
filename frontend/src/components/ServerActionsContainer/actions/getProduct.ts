"use server";

export async function getProduct(id: string) {
  const response = await fetch(
    `${process.env.NEXT_DOCKER_API_URL}/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
