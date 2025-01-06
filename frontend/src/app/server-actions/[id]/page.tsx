import { getProduct } from "@/components/ServerActionsContainer/actions/getProduct";
import FormServerActions from "@/components/ServerActionsContainer/Form/Form";
type paramsType = Promise<{ id: string }>;

export default async function ServerActionsPageById(props: {
  params: paramsType;
}) {
  const { id } = await props.params;
  const product = await getProduct(id);

  return <FormServerActions product={product} />;
}
