"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function removeProduct(values: FormData): Promise<void> {
  const id = values.get("id");
  if (!id) {
    throw new Error("No id provided");
  }

  const response = await fetch(
    `${process.env.NEXT_DOCKER_API_URL}/products/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  // revalidatePath("/server-actions");
  redirect("/server-actions/?success=deleted&entity=Product");
}
