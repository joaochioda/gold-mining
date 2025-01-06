"use client";

import { useToast } from "@/hooks/use-toast";
import unSelectMutation, {
  apiFetcher,
  deleteMutation,
  selectMutation,
  useRequest,
} from "@/hooks/useRequest";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function ProductList() {
  const { data, error, isLoading } = useRequest("/products");
  const { toast } = useToast();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function deleteProduct(id: string) {
    deleteMutation("/products", id);
    try {
      await apiFetcher(`/products/${id}`, {
        method: "DELETE",
      });
      toast({
        description: "Product deleted",
        variant: "success",
      });
    } catch {
      toast({
        description: "Error deleting product",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-[300px] m-auto">
      {data?.map(
        (product: {
          id: string;
          name: string;
          price: number;
          description: string;
        }) => (
          <div
            key={product.id}
            className="border-2 border-primary mb-2 p-2 flex flex-col gap-2"
          >
            <p className="text-primary">{product.name}</p>
            <p className="text-primary">R$ {product.price}</p>
            <p className="text-primary">{product.description}</p>
            <p className="text-primary">{product.id}</p>
            <div className="flex gap-2 justify-end">
              <AiFillDelete
                className="text-primaryIcon"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => deleteProduct(product.id)}
              />
              <AiFillEdit
                className="text-primaryIcon"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  unSelectMutation("/products");
                  selectMutation("/products", product.id);
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
