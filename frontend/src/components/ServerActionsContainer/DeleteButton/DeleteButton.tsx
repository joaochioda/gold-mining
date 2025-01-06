import { AiFillDelete } from "react-icons/ai";
import removeProduct from "../actions/removeProduct";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form action={removeProduct}>
      <input type="hidden" value={id} name="id" />
      <Button variant="primary" type="submit">
        <AiFillDelete
          style={{
            cursor: "pointer",
          }}
        />
      </Button>
    </form>
  );
}
