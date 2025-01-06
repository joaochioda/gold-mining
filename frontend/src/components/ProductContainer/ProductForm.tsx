"use client";

import unSelectMutation, {
  addMutation,
  apiFetcher,
  editMutation,
  forceMutate,
  useRequest,
} from "@/hooks/useRequest";
import { IProduct } from "@/interfaces/product";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { FormikHelpers } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nome muito curto")
    .max(50, "Nome muito longo")
    .required("Campo obrigatório"),
  price: Yup.number()
    .min(0, "Preço deve ser maior que 0")
    .required("Campo obrigatório"),
  description: Yup.string()
    .min(3, "Descrição muito curta")
    .max(200, "Descrição muito longa")
    .required("Campo obrigatório"),
});

function AutoFillFields({ selectedProduct }: { selectedProduct: IProduct }) {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (selectedProduct?.id) {
      setFieldValue("name", selectedProduct.name);
      setFieldValue("price", selectedProduct.price);
      setFieldValue("description", selectedProduct.description);
    }
  }, [selectedProduct?.id, setFieldValue]);

  return null;
}

export default function ProductForm() {
  const { data } = useRequest("/products");
  const { toast } = useToast();

  const selectedProduct = data?.find(
    (product: IProduct) => product.selected === true
  );

  const submitProduct = async (
    values: IProduct,
    { resetForm }: FormikHelpers<IProduct>
  ) => {
    if (selectedProduct) {
      editMutation<IProduct>("/products", values, selectedProduct.id!);
      try {
        await apiFetcher(`/products/${selectedProduct.id}`, {
          method: "PATCH",
          body: values,
        });
        toast({
          description: "Product updated",
          variant: "success",
        });
        unSelectMutation("/products");
        resetForm();
      } catch (e) {
        console.error(e);
        toast({
          description: "Error updating product",
          variant: "destructive",
        });
        forceMutate("/products");
      }
    } else {
      addMutation<IProduct>("/products", values);
      try {
        await apiFetcher("/products", {
          method: "POST",
          body: values,
        });
        resetForm();
        toast({
          description: "Product created",
          variant: "success",
        });
        forceMutate("/products");
      } catch {
        toast({
          description: "Error creating product",
          variant: "destructive",
        });
        forceMutate("/products");
      }
    }
  };

  return (
    <div className="w-[500px] mx-auto">
      <Formik
        initialValues={{
          name: "",
          price: 0,
          description: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={submitProduct}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <AutoFillFields selectedProduct={selectedProduct} />
            <div>
              <Label>Nome</Label>
              <Field
                as={Input}
                type="text"
                name="name"
                variant="outlined"
                placeholder="Digite o nome do produto"
                fullWidth
                margin="normal"
                sx={{ textAlign: "left", margin: 0 }}
                error={errors.name}
              />
              {errors.name && touched.name ? (
                <Label variant={"error"}>{`* ${errors.name}`}</Label>
              ) : null}
            </div>

            <div>
              <Label>Preço</Label>
              <Field
                as={Input}
                name="price"
                type="number"
                variant="outlined"
                placeholder="Digite o preço do produto"
                fullWidth
                margin="normal"
                sx={{ textAlign: "left", margin: 0 }}
                error={errors.price}
              />
              {errors.price && touched.price ? (
                <Label variant="error">{`* ${errors.price}`}</Label>
              ) : null}
            </div>

            <div>
              <Label>Descrição</Label>
              <Field
                as={Input}
                name="description"
                type="text"
                variant="outlined"
                placeholder="Digite a descrição do produto"
                fullWidth
                margin="normal"
                sx={{ textAlign: "left", margin: 0 }}
                error={errors.description}
              />
              {errors.description && touched.description ? (
                <Label variant={"error"}>{`* ${errors.description}`}</Label>
              ) : null}
            </div>

            <Button data-testid="submit" variant={"primary"} type="submit">
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
