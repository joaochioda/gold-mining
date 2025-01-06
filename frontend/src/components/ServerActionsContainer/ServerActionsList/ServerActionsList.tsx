import { IProduct } from "@/interfaces/product";
import { getProducts } from "../actions/getProducts";
import Link from "next/link";
import DeleteButton from "../DeleteButton/DeleteButton";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default async function ServerActionsList() {
  const products = await getProducts();

  return (
    <div className="w-[500px] mx-auto flex flex-col gap-4">
      <Link href="/server-actions/new">
        <Button variant="primary" color="primary">
          Create new Product
        </Button>
      </Link>
      <ul>
        {products.map((product: IProduct) => (
          <li
            key={product.id}
            className="border-2 border-primary mb-2 p-2 flex flex-col gap-2"
          >
            <Label>{product.name}</Label>
            <Label>{product.description}</Label>
            <Label>R$ {product.price}</Label>
            <div className="flex gap-2 justify-end">
              <Link href={`/server-actions/${product.id}`}>
                <Button>
                  <AiFillEdit />
                </Button>
              </Link>
              <DeleteButton id={product.id!} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
