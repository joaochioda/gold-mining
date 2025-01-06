"use client";

import { ProductSchema } from "@/components/ProductContainer/ProductForm";
import { Field, Form, Formik } from "formik";
import { createProduct } from "../actions/createProduct";
import { IProduct } from "@/interfaces/product";
import updateProduct from "../actions/updateProduct";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormServerActions({
  product,
}: {
  product: IProduct | null;
}) {
  return (
    <div className="w-[500px] mx-auto">
      <Formik
        initialValues={{
          name: product?.name || "",
          price: product?.price || 0,
          description: product?.description || "",
          id: product?.id,
        }}
        validationSchema={ProductSchema}
        onSubmit={product?.id ? updateProduct : createProduct}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            {product?.id && (
              <input type="hidden" name="id" value={product.id} />
            )}
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
                <Label variant={"error"}>{`* ${errors.price}`}</Label>
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

            <Button
              variant="primary"
              data-testid="submit"
              color="primary"
              type="submit"
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
